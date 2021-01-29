import * as admin from 'firebase-admin'
import { FreeeToken } from '../const/types'
import FreeeCryptor, { FreeeTokenWithCryptInfo } from './freee-cryptor'

const MARGIN_OF_EXPIRES_SECONDS = 300

export class TokenManager {
  private admin: admin.app.App
  private oauth2: any // Can not use typescript version due to mismatch with freee oauth
  private cryptor: FreeeCryptor | null
  private tokenCache: { [key: string]: FreeeTokenWithCryptInfo }

  constructor(admin: admin.app.App, oauth2: any, cryptor: FreeeCryptor | null) {
    this.admin = admin
    this.oauth2 = oauth2
    this.cryptor = cryptor
    this.tokenCache = {}
  }

  /**
   * Get token with handling refresh token
   */
  async get(userId: string): Promise<string> {
    let freeeToken: any;

    try {
      console.log(`TokenManager_get_start:`, {userId: userId})
      freeeToken = await this.getTokenFromFirebase(userId)
    } catch (error) {
      throw error
    }

    if (this.tokenExpired(freeeToken)) {
      console.log(`accessToken has been expired for user:`, userId)

      try {
        return await this.refreshToken(freeeToken, userId)
      } catch (error) {
        if (error.output && error.output.statusCode === 401) {
          console.log('Token is already refreshed in other instance:', error)

          const newToken = await this.getTokenFromFirebase(userId, true)
          if (this.tokenExpired(newToken)) {
            console.error('Can not get available token:', error)
            throw error
          }
          return newToken.accessToken
        } else {
          throw error
        }
      }
    } else {
      return freeeToken.accessToken
    }
  }

  /**
   * Get token with handling refresh token
   */
  async save(
    userId: string,
    email: string,
    freeeToken: FreeeToken
  ): Promise<void> {
    const token = await this.encrypt(freeeToken)

    // Save freee token to firestore
    await this.admin
      .firestore()
      .doc(`/freeeTokens/${userId}`)
      .set({
        ...token,
        email
      })
  }

  async createCryptoKey(date: Date): Promise<void> {
    if (this.cryptor) {
      await this.cryptor.createCryptoKey(date)
    }
  }

  private async refreshToken(
    freeeToken: FreeeTokenWithCryptInfo,
    userId: string
  ) {
    // refresh
    const tokenObject = {
      access_token: freeeToken.accessToken,
      refresh_token: freeeToken.refreshToken,
      expires_in: freeeToken.expiresIn
    }
    const accessToken = this.oauth2.accessToken.create(tokenObject)
    const newToken = await accessToken.refresh()

    // encrypt and cache
    const token = (await this.encrypt({
      accessToken: newToken.token.access_token,
      refreshToken: newToken.token.refresh_token,
      expiresIn: newToken.token.expires_in,
      createdAt: newToken.token.created_at
    })) as FreeeTokenWithCryptInfo
    this.tokenCache[userId] = token

    // save token to firestore
    await this.admin
      .firestore()
      .doc(`/freeeTokens/${userId}`)
      .set({ ...token }, { merge: true })

    console.log('accessToken is successfully refreshed for user:', userId)

    return newToken.token.access_token
  }

  private tokenExpired(freeeToken: FreeeTokenWithCryptInfo) {
    const expiredSeconds =
      freeeToken.createdAt + freeeToken.expiresIn - MARGIN_OF_EXPIRES_SECONDS
    const nowInSeconds = new Date().getTime() / 1000
    const shouldRefresh = nowInSeconds >= expiredSeconds
    return shouldRefresh
  }

  private async getTokenFromFirebase(userId: string, fromFirestore?: boolean) {
    if (!fromFirestore) {
      console.log(`TokenManager_getTokenFromFirebase_fromFirestore:`, {fromFirestore: fromFirestore})
      const cachedToken = this.tokenCache[userId]
      if (cachedToken) {
        console.log(`TokenManager_getTokenFromFirebase_cachedToken:`, {cachedToken: cachedToken})
        return await this.decrypt(cachedToken)
      }
    }

    const snap = await this.admin
      .firestore()
      .doc(`/freeeTokens/${userId}`)
      .get()
    const token = snap.data() as FreeeTokenWithCryptInfo
    this.tokenCache[userId] = token
    console.log(`TokenManager_getTokenFromFirebase_firestore:`, {firestore: token})

    console.log('Token is retrieved from firestore for user:', userId)

    return await this.decrypt(token)
  }

  private async encrypt(freeeToken: FreeeToken) {
    return this.cryptor ? await this.cryptor.encrypt(freeeToken) : freeeToken
  }

  private async decrypt(freeeToken: FreeeTokenWithCryptInfo) {
    return this.cryptor ? await this.cryptor.decrypt(freeeToken) : freeeToken
  }
}
