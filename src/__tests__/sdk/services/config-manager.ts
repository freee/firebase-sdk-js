const PROJECT_ID = 'test-project-id'
const REGION_US = 'us-central1'
const MODE = 'production'
process.env.FIREBASE_CONFIG = JSON.stringify({
  projectId: PROJECT_ID
})

let mockGetMode = jest.fn().mockReturnValue(MODE)
let mockGetRegion = jest.fn().mockReturnValue(REGION_US)

jest.mock('firebase-functions', () => {
  return {
    config: () => ({
      env: {
        mode: mockGetMode(),
        region: mockGetRegion()
      }
    })
  }
})

import { ConfigKeys, ConfigManager } from '../../../sdk/services/config-manager'

beforeAll(() => {
  console.log('call before all')
})

describe('ConfigManager', () => {
  describe('get', () => {
    it('return default value if config is null or does not have key', () => {
      expect(ConfigManager.get(null, ConfigKeys.apiHost)).toStrictEqual(
        'https://api.freee.co.jp'
      )
      expect(ConfigManager.get({}, ConfigKeys.apiHost)).toStrictEqual(
        'https://api.freee.co.jp'
      )
    })
    it('return config value if config is not null and has key', () =>
      expect(
        ConfigManager.get({ apiHost: 'apiHost' }, ConfigKeys.apiHost)
      ).toStrictEqual('apiHost'))
  })

  describe('getDefaultValue', () => {
    it('return default value if config does not have production value', () =>
      expect(
        ConfigManager['getDefaultValue'](ConfigKeys.redirectPath)
      ).toStrictEqual('/redirect'))

    it('return production value if config have production value', () => {
      expect(
        ConfigManager['getDefaultValue'](ConfigKeys.apiHost)
      ).toStrictEqual('https://api.freee.co.jp')
      expect(
        ConfigManager['getDefaultValue'](ConfigKeys.appHost)
      ).toStrictEqual(`https://${PROJECT_ID}.web.app`)
      expect(
        ConfigManager['getDefaultValue'](ConfigKeys.authHost)
      ).toStrictEqual(
        `https://${REGION_US}-${PROJECT_ID}.cloudfunctions.net/api/auth`
      )
      expect(
        ConfigManager['getDefaultValue'](ConfigKeys.tokenHost)
      ).toStrictEqual('https://accounts.secure.freee.co.jp')
      expect(
        ConfigManager['getDefaultValue'](ConfigKeys.cryptoKeyBucket)
      ).toStrictEqual(`${PROJECT_ID}.appspot.com`)
    })
  })
})
