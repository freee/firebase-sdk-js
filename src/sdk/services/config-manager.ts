import * as functions from 'firebase-functions'
import { SDKBaseConfig } from '../const/types'

const SUPPORTED_REGIONS = functions.SUPPORTED_REGIONS
const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG!)
const projectId = adminConfig.projectId
const region =
  functions.config().env && functions.config().env.region
    ? functions.config().env.region
    : 'asia-northeast1'

export enum ConfigKeys {
  apiHost = 'apiHost',
  appHost = 'appHost',
  authHost = 'authHost',
  redirectPath = 'redirectPath',
  callbackPath = 'callbackPath',
  companiesPath = 'companiesPath',
  homePath = 'homePath',
  tokenHost = 'tokenHost',
  authorizePath = 'authorizePath',
  tokenPath = 'tokenPath',
  cryptoKeyBucket = 'cryptoKeyBucket'
}

interface FirebaseFunctionsConfigs {
  env: {
    mode: 'production' | string
    region: typeof SUPPORTED_REGIONS
  }
  freee: {
    client_id: string
    client_secret: string
  }
}

interface DefaultConfig {
  key: ConfigKeys
  default: string
  production?: string
}

interface DefaltConfigs {
  freee: DefaultConfig[]
  firebase: DefaultConfig[]
}

/**
 * Default value definitions for {@link SDKFreeeConfig}
 *
 * @see {SDKFreeeConfig}
 */
const DEFAULT_CONFIGS: DefaltConfigs = {
  freee: [
    {
      key: ConfigKeys.apiHost,
      default: 'https://api.freee.co.jp',
      production: 'https://api.freee.co.jp'
    },
    {
      key: ConfigKeys.appHost,
      default: 'http://localhost:5000',
      production: `https://${projectId}.web.app`
    },
    {
      key: ConfigKeys.authHost,
      default: `http://localhost:5001/${projectId}/${region}/api/auth`,
      production: `https://${region}-${projectId}.cloudfunctions.net/api/auth`
    },
    {
      key: ConfigKeys.redirectPath,
      default: '/redirect'
    },
    {
      key: ConfigKeys.callbackPath,
      default: '/callback'
    },
    {
      key: ConfigKeys.companiesPath,
      default: '/companies'
    },
    {
      key: ConfigKeys.homePath,
      default: '/'
    },
    {
      key: ConfigKeys.tokenHost,
      default: 'https://accounts.secure.freee.co.jp',
      production: 'https://accounts.secure.freee.co.jp'
    },
    {
      key: ConfigKeys.authorizePath,
      default: '/public_api/authorize'
    },
    {
      key: ConfigKeys.tokenPath,
      default: '/public_api/token'
    }
  ],
  firebase: [
    {
      key: ConfigKeys.cryptoKeyBucket,
      default: `${projectId}.appspot.com`
    }
  ]
}

export class ConfigManager {
  static get(configs: SDKBaseConfig | null, key: ConfigKeys) {
    if (configs && this.hasKey(configs, key)) {
      return configs[key]
    }

    return this.getDefaultValue(key)
  }

  static getFunctionsConfigs(): FirebaseFunctionsConfigs {
    return functions.config() as FirebaseFunctionsConfigs
  }

  private static getDefaultValue(key: ConfigKeys) {
    const defaultConfigs = ([] as DefaultConfig[])
      .concat(DEFAULT_CONFIGS.freee)
      .concat(DEFAULT_CONFIGS.firebase)
    const config = defaultConfigs.find(defaultConfig => defaultConfig.key === key)!
    return this.isProduction() && config.production
      ? config.production
      : config.default
  }

  private static isProduction() {
    const configs = this.getFunctionsConfigs()
    return configs.env && configs.env.mode === 'production'
  }

  private static hasKey(configs: SDKBaseConfig, key: ConfigKeys) {
    return Object.keys(configs).find(configKey => configKey === key)
  }
}
