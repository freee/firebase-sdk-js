import { Bucket } from '@google-cloud/storage'
import { Cipher, Decipher } from 'crypto'
import { format } from 'date-fns'
import { FreeeToken } from '../const/types'

const crypto = require('crypto')

const ALGORITHM = 'aes-256-cbc'
const OUT = 'base64'
const IN = 'utf8'
const IV_LENGTH = 16

export interface FreeeTokenWithCryptInfo extends FreeeToken {
  keyFileName: string
  algorithm: string
  iv: string
}

class FreeeCryptor {
  private bucket: Bucket
  private keyCache: { [key: string]: Buffer }

  constructor(bucket: Bucket) {
    this.bucket = bucket
    this.keyCache = {}
  }

  /**
   * Create crypto key to bucket for it by specified date
   */
  async createCryptoKey(date: Date): Promise<void> {
    const keyFileName = format(date, 'yyyyMM')
    return this.create(keyFileName)
  }

  /**
   * Encrypt freee token
   *
   * @param {Object} token
   * @param {string} token.accessToken
   * @param {string} token.refreshToken
   *
   * @return {Promise<Object>} - encrypted freee token object
   */
  async encrypt(token: FreeeToken): Promise<FreeeTokenWithCryptInfo> {
    const { accessToken, refreshToken } = token
    const keyFileName = format(new Date(), 'yyyyMM')
    const key = await this.getKey(keyFileName)
    const iv = crypto.randomBytes(IV_LENGTH)

    return {
      ...token,
      accessToken: this.crypt(accessToken, this.cipher(key, iv), IN, OUT),
      refreshToken: this.crypt(refreshToken, this.cipher(key, iv), IN, OUT),
      keyFileName,
      algorithm: ALGORITHM,
      iv
    }
  }

  /**
   * Decrypt freee token
   *
   * @param {Object} token
   * @param {string} token.accessToken
   * @param {string} token.refreshToken
   * @param {string} token.keyFileName
   * @param {string} token.algorithm
   * @param {Buffer} token.iv
   *
   * @return {Promise<Object>} - decrypted freee token object
   */
  async decrypt(
    token: FreeeTokenWithCryptInfo
  ): Promise<FreeeTokenWithCryptInfo> {
    const { accessToken, refreshToken, keyFileName, algorithm, iv } = token
    const key = await this.getKey(keyFileName)
    console.log(`FreeeCryptor_decrypt_getKey:`, {decryptKey: key})

    return {
      ...token,
      accessToken: this.crypt(
        accessToken,
        this.decipher(algorithm, key, iv),
        OUT,
        IN
      ),
      refreshToken: this.crypt(
        refreshToken,
        this.decipher(algorithm, key, iv),
        OUT,
        IN
      )
    }
  }

  private cipher(cryptoKey: any, iv: any): Cipher {
    return crypto.createCipheriv(ALGORITHM, cryptoKey, iv)
  }

  private decipher(algorithm: string, cryptoKey: any, iv: any): Decipher {
    return crypto.createDecipheriv(algorithm, cryptoKey, iv)
  }

  private async getKey(keyFileName: string) {
    if (this.keyCache[keyFileName]) {
      return this.keyCache[keyFileName]
    }

    try {
      return await this.get(keyFileName)
    } catch (error) {
      console.info('No key file for:', keyFileName)
      await this.create(keyFileName)
      return await this.get(keyFileName)
    }
  }

  private crypt(
    targetStr: any,
    algorithm: Cipher | Decipher,
    inputEncoding: any,
    outputEncoding: any
  ) {
    let result: any = algorithm.update(targetStr, inputEncoding, outputEncoding)
    console.log(`FreeeCryptor_crypt_update:`, {updateResult: result})
    result += algorithm.final(outputEncoding)
    console.log(`FreeeCryptor_crypt_final:`, {cryptFinalResult: result})
    return result
  }

  private async create(keyFileName: string) {
    const encryptionKey = crypto.randomBytes(32)
    const keyFile = this.bucket.file(keyFileName)
    await keyFile.save(encryptionKey)
    console.log('New crypto key is successfully created for:', keyFileName)
  }

  private async get(keyFileName: string) {
    const response = await this.bucket.file(keyFileName).download()
    this.keyCache[keyFileName] = response[0]
    console.log('Crypto key is retrieved from storage for:', keyFileName)
    return response[0]
  }
}

export default FreeeCryptor
