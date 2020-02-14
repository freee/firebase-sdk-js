import { AxiosStatic } from 'axios'
import * as admin from 'firebase-admin'
import { Response } from 'firebase-functions'
import { FreeeToken, SDKConfig } from '../const/types'
import { ConfigKeys, ConfigManager } from '../services/config-manager'
import { TokenManager } from '../services/token-manager'

export class FreeeFirebaseAuthClient {
  private admin: admin.app.App
  private oauth2: any // Can not use typescript version due to mismatch with freee oauth
  private axios: AxiosStatic
  private tokenManager: TokenManager
  private clientId: string
  private clientSecret: string
  private redirectPath: string
  private callbackPath: string
  private companiesPath: string
  private homePath: string
  private appHost: string
  private authHost: string
  private apiKey?: string

  constructor(
    admin: admin.app.App,
    oauth2: any,
    axios: AxiosStatic,
    tokenManager: TokenManager,
    config: SDKConfig
  ) {
    this.admin = admin
    this.oauth2 = oauth2
    this.axios = axios
    this.tokenManager = tokenManager
    // path setting
    const freeeConfigs = config.freee!
    const functionsConfigs = ConfigManager.getFunctionsConfigs()
    this.clientId = functionsConfigs.freee.client_id
    this.clientSecret = functionsConfigs.freee.client_secret
    this.redirectPath = ConfigManager.get(freeeConfigs, ConfigKeys.redirectPath)
    this.callbackPath = ConfigManager.get(freeeConfigs, ConfigKeys.callbackPath)
    this.companiesPath = ConfigManager.get(
      freeeConfigs,
      ConfigKeys.companiesPath
    )
    this.homePath = ConfigManager.get(freeeConfigs, ConfigKeys.homePath)
    this.appHost = ConfigManager.get(freeeConfigs, ConfigKeys.appHost)
    this.authHost = ConfigManager.get(freeeConfigs, ConfigKeys.authHost)
    this.apiKey = config.firebase && config.firebase.apiKey!
  }

  /**
   * Redirect screen to authorize
   */
  redirect(res: Response): void {
    const redirectUri = this.oauth2.authorizationCode.authorizeURL({
      redirect_uri: `${this.authHost}${this.getCallbackPath()}`
    })
    res.redirect(redirectUri)
  }

  /**
   * Get token, save it to firebase and login firebase
   */
  async callback(code: string, res: Response): Promise<void> {
    try {
      const result = await this.oauth2.authorizationCode
        .getToken({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          code: code,
          redirect_uri: `${this.authHost}${this.getCallbackPath()}`
        })
        .catch(() => {
          res.send(this.signInRefusedTemplate())
        })

      const freeeToken = {
        accessToken: result.access_token,
        refreshToken: result.refresh_token,
        expiresIn: result.expires_in,
        createdAt: result.created_at
      }

      // get freee user
      const response = await this.getFreeeUser(freeeToken.accessToken)

      const id = response.data.user.id
      const email = response.data.user.email
      // consider null value of displayName
      const displayName = response.data.user.display_name
        ? response.data.user.display_name
        : ''
      // Create a Firebase Account and get the custom Auth Token.
      const firebaseToken = await this.createFirebaseAccount(
        id,
        email,
        displayName,
        freeeToken
      )
      // redirect to home path with token info
      res.redirect(`${this.appHost}${this.homePath}?token=${firebaseToken}`)
    } catch (error) {
      console.error('Some error occured on login process:', error)
      res.status(401).send('Some error occured on login process')
    }
  }

  /**
   * path for redirect on freee authorization
   */
  getRedirectPath(): string {
    return this.redirectPath
  }

  /**
   * path for callback on freee authorization
   */
  getCallbackPath(): string {
    return this.callbackPath
  }

  /**
   * path for callback on freee authorization
   */
  getCompaniesPath(): string {
    return this.companiesPath
  }

  /**
   * Create crypto key to bucket for it by specified date
   */
  async createCryptoKey(date: Date): Promise<void> {
    await this.tokenManager.createCryptoKey(date)
  }

  private getFreeeUser(accessToken: string) {
    return this.axios.get('/api/v1/users/me?companies=true', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
  }

  /**
   * create firebase account and token
   */
  private async createFirebaseAccount(
    id: number,
    email: string,
    displayName: string,
    freeeToken: FreeeToken
  ): Promise<string> {
    const uid = id.toString()

    await this.tokenManager.save(uid, email, freeeToken)

    // Create or update the user account.
    await this.admin
      .auth()
      .updateUser(uid, {
        email: email,
        displayName: displayName
      })
      .catch(async error => {
        if (error.code === 'auth/user-not-found') {
          return await this.admin.auth().createUser({
            uid: uid,
            email: email,
            displayName: displayName
          })
        }
        throw error
      })

    return await this.admin.auth().createCustomToken(uid)
  }

  /**
   * Script for redirection when user refuse sign-up
   */
  private signInRefusedTemplate(): string {
    return `
      <script>
        window.location.href = '${this.appHost}'
      </script>`
  }
}
