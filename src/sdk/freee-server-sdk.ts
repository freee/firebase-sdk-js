/**
 * @fileoverview sdk for freee api in server side
 */
import axios from 'axios'
import * as admin from 'firebase-admin'
import { FreeeAPIClient } from './api/freee-api-client'
import { FreeeFirebaseAuthClient } from './auth/freee-firebase-auth-client'
import { SDKConfig, SDKFreeeConfig } from './const/types'
import { ConfigKeys, ConfigManager } from './services/config-manager'
import FreeeCryptor from './services/freee-cryptor'
import { TokenManager } from './services/token-manager'

class FreeeServerSDK {
  private admin: admin.app.App
  private apiClient: FreeeAPIClient
  private firebaseAuthClient: FreeeFirebaseAuthClient

  constructor(
    config: SDKConfig,
    serviceAccount: { [key: string]: string } | null
  ) {
    const freeeConfigs = config.freee!
    // Set up firebase admin
    if (serviceAccount) {
      // for local
      this.admin = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
        storageBucket: `${serviceAccount.project_id}.appspot.com`
      })
    } else {
      // Firebase setup by ADC
      this.admin = admin.initializeApp()
    }

    // Set up cryptor for freee token
    const cryptoKeyBucket = ConfigManager.get(
      config.firebase!,
      ConfigKeys.cryptoKeyBucket
    )
    const cryptor = cryptoKeyBucket
      ? new FreeeCryptor(this.admin.storage().bucket(cryptoKeyBucket))
      : null

    // Set up oauth2 client
    const oauth2 = require('simple-oauth2').create(
      this.getCredentials(freeeConfigs)
    )
    const tokenManager = new TokenManager(this.admin, oauth2, cryptor)

    axios.defaults.baseURL = ConfigManager.get(freeeConfigs, ConfigKeys.apiHost)

    this.apiClient = new FreeeAPIClient(tokenManager, axios)
    this.firebaseAuthClient = new FreeeFirebaseAuthClient(
      this.admin,
      oauth2,
      axios,
      tokenManager,
      config
    )
  }

  /**
   * get firebase admin instance
   */
  firebaseApp(): admin.app.App {
    return this.admin
  }

  /**
   * get firebase admin instance
   */
  api(): FreeeAPIClient {
    return this.apiClient
  }

  /**
   * get firebase admin instance
   */
  auth(): FreeeFirebaseAuthClient {
    return this.firebaseAuthClient
  }

  private getCredentials(freeeConfigs: SDKFreeeConfig) {
    const freee = ConfigManager.getFunctionsConfigs().freee

    const credentials = {
      client: {
        id: freee.client_id,
        secret: freee.client_secret
      },
      auth: {
        tokenHost: ConfigManager.get(freeeConfigs, ConfigKeys.tokenHost),
        authorizePath: ConfigManager.get(
          freeeConfigs,
          ConfigKeys.authorizePath
        ),
        tokenPath: ConfigManager.get(freeeConfigs, ConfigKeys.tokenPath)
      }
    }

    return credentials
  }
}

export default FreeeServerSDK
