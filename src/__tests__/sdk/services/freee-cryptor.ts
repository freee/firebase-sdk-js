import * as admin from 'firebase-admin'
import FreeeCryptor from '../../../sdk/services/freee-cryptor'

const key = Buffer.from('aaa', 'utf8')

const mockDownload = jest.fn()
const mockExists = jest.fn()
const mockSave = jest.fn()

jest.mock('firebase-admin', () => {
  return {
    storage: () => ({
      bucket: (bucketPath: string) => ({
        file: (filePath: string) => ({
          download: async () => mockDownload(),
          exists: async () => mockExists(),
          save: async () => mockSave()
        })
      })
    })
  }
})

const bucket = admin.storage().bucket()

const keyFileName = '201907'

describe('FreeeCryptor', () => {
  describe('getKey', () => {
    beforeEach(async () => {
      mockDownload.mockReset()
      mockDownload.mockRejectedValue(new Error('Must not be called'))
      mockExists.mockReset()
      mockExists.mockRejectedValue(new Error('Must not be called'))
      mockSave.mockReset()
      mockSave.mockRejectedValue(new Error('Must not be called'))
    })

    it('when crypto key is already created', async () => {
      mockDownload.mockReset()
      mockDownload
        .mockReturnValueOnce([key])
        .mockRejectedValue(new Error('Must not be called'))

      const cryptor = new FreeeCryptor(bucket)
      expect(await cryptor['getKey'](keyFileName)).toStrictEqual(key)
      // return key from cache(no exception)
      expect(await cryptor['getKey'](keyFileName)).toStrictEqual(key)
    })

    it('when crypto key is not created yet', async () => {
      mockDownload.mockReset()
      mockDownload
        .mockRejectedValueOnce(new Error('crypto key does not exist'))
        .mockReturnValueOnce([key])
        .mockRejectedValue(new Error('Must not be called'))
      mockExists.mockReset()
      mockExists
        .mockReturnValueOnce([false])
        .mockRejectedValue(new Error('Must not be called'))
      mockSave.mockReset()
      mockSave
        .mockReturnValueOnce(true)
        .mockRejectedValue(new Error('Must not be called'))

      const cryptor = new FreeeCryptor(bucket)
      expect(await cryptor['getKey'](keyFileName)).toStrictEqual(key)
      // return key from cache(no exception)
      expect(await cryptor['getKey'](keyFileName)).toStrictEqual(key)
    })

    it('when crypto key is in error', async () => {
      mockDownload.mockReset()
      mockDownload
        .mockRejectedValueOnce(new Error('Unknown download error'))
        .mockRejectedValue(new Error('Must not be called'))
      mockExists.mockReset()
      mockExists
        .mockRejectedValueOnce(new Error('Unknown exists error'))
        .mockRejectedValue(new Error('Must not be called'))

      const cryptor = new FreeeCryptor(bucket)
      await expect(cryptor['getKey'](keyFileName)).rejects.toThrow(
        'Unknown exists error'
      )
    })

    it('error getting crypto key only once', async () => {
      mockDownload.mockReset()
      mockDownload
        .mockRejectedValueOnce(new Error('Unknown error'))
        .mockReturnValueOnce([key])
        .mockRejectedValue(new Error('Must not be called'))
      mockExists.mockReset()
      mockExists
        .mockReturnValueOnce([true])
        .mockRejectedValue(new Error('Must not be called'))

      const cryptor = new FreeeCryptor(bucket)
      expect(await cryptor['getKey'](keyFileName)).toStrictEqual(key)
    })
  })
})
