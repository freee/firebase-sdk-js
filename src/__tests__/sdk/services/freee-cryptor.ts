import * as admin from 'firebase-admin'
import FreeeCryptor from '../../../sdk/services/freee-cryptor'

const key = Buffer.from('aaa', 'utf8')

const mockGetWhenCreated = jest
  .fn()
  .mockReturnValueOnce([key])
  .mockRejectedValue(new Error('Must not be called'))

const mockGetWhenNotCreated = jest
  .fn()
  .mockRejectedValueOnce(new Error('Must not be called'))
  .mockReturnValueOnce([key])
  .mockRejectedValue(new Error('Must not be called'))

let isCreated = true
let isExists = false

jest.mock('firebase-admin', () => {
  return {
    storage: () => ({
      bucket: (path: string) => ({
        file: (path: string) => ({
          download: async () =>
            isCreated ? mockGetWhenCreated() : mockGetWhenNotCreated(),
          exists: async () => [isExists],
          save: () => (isCreated = true)
        })
      })
    })
  }
})

const bucket = admin.storage().bucket()

const keyFileName = '201907'

describe('FreeeCryptor', () => {
  describe('getKey', () => {
    describe('when crypto key is already created', () => {
      const cryptor = new FreeeCryptor(bucket)

      it('return key from storage', async () => {
        expect(await cryptor['getKey'](keyFileName)).toStrictEqual(key)
      })
      it('return key from cache(no exception)', async () => {
        expect(await cryptor['getKey'](keyFileName)).toStrictEqual(key)
      })
    })

    describe('when crypto key is not created yet', () => {
      const cryptor = new FreeeCryptor(bucket)
      isCreated = false
      it('return key from storage after create key', async () => {
        expect(await cryptor['getKey'](keyFileName)).toStrictEqual(key)
      })
      it('return key from cache(no exception)', async () => {
        expect(await cryptor['getKey'](keyFileName)).toStrictEqual(key)
      })
    })
  })
})
