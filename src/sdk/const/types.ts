export interface ParamJSON {
  [key: string]: any
}

export interface FreeeToken {
  accessToken: string
  refreshToken: string
  expiresIn: number
  createdAt: number
}

export interface SDKBaseConfig {
  [key: string]: any
}

export interface SDKFreeeConfig extends SDKBaseConfig {
  /**
   * Redirect path
   *
   * @defaultValue '/redirect'
   */
  redirectPath?: string

  /**
   * Callback path
   *
   * @defaultValue '/callback'
   */
  callbackPath?: string

  /**
   * Companies path
   *
   * @defaultValue '/companies'
   */
  companiesPath?: string

  /**
   * Home path of an application
   *
   * @defaultValue '/'
   */
  homePath?: string

  /**
   * Application host url
   *
   * @defaultValue "http://localhost:5000"
   * @defaultValue `https://${process.env.FIREBASE_CONFIG.projectId}.web.app` when functions.config().env.mode === 'production'
   */
  appHost?: string

  /**
   * Authrization host url
   *
   * @defaultValue `http://localhost:5001/${process.env.FIREBASE_CONFIG.projectId}/us-central1/api/auth`
   * @defaultValue `https://${functions.config().env.region || 'asia-northeast1'}-${process.env.FIREBASE_CONFIG.projectId}.cloudfunctions.net/api/auth` when functions.config().env.mode === 'production'
   */
  authHost?: string

  /**
   * freee API server host url
   *
   * @defaultValue "https://api.freee.co.jp"
   * @defaultValue 'https://api.freee.co.jp' when functions.config().env.mode === 'production'
   */
  apiHost?: string

  /**
   * freee token server host url
   *
   * @defaultValue "https://accounts.secure.freee.co.jp"
   * @defaultValue "https://accounts.secure.freee.co.jp" when functions.config().env.mode === 'production'
   */
  tokenHost?: string

  /**
   * Authrization path
   *
   * @defaultValue '/public_api/authorize'
   */
  authorizePath?: string

  /**
   * Token path
   *
   * @defaultValue '/public_api/token'
   */
  tokenPath?: string
}

export interface SDKFirebaseConfig extends SDKBaseConfig {
  /**
   * Api key for firebase project
   */
  apiKey?: string
  /**
   * Bucket name for cryptoKey
   */
  cryptoKeyBucket?: string
}

export interface SDKConfig {
  freee?: SDKFreeeConfig
  firebase?: SDKFirebaseConfig
}
