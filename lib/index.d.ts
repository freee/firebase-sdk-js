import { AxiosPromise } from 'axios';
import * as express from 'express';
import * as admin from 'firebase-admin';
import { ParamJSON, SDKConfig } from '../src/sdk/const/types';

declare module 'freee-firebase-sdk' {
  /**
   * Freee Server SDK
   */
  export class FreeeServerSDK {
    constructor(config: SDKConfig, serviceAccount: { [key: string]: string })

    /**
     * get firebase admin instance
     */
    firebaseApp(): admin.app.App

    /**
     * get freee api client instance
     */
    api(): FreeeAPIClient

    /**
     * get auth client instance
     */
    auth(): FreeeFirebaseAuthClient
  }

  class FreeeAPIClient {
    get<T = any>(
      url: string,
      params: ParamJSON,
      userId: string
    ): AxiosPromise<T>
    post<T = any>(url: string, data: ParamJSON, userId: string): AxiosPromise<T>
    put<T = any>(url: string, data: ParamJSON, userId: string): AxiosPromise<T>
    delete(url: string, data: ParamJSON, userId: string): AxiosPromise
  }

  class FreeeFirebaseAuthClient {
    /**
     * Redirect url to authorize
     */
    redirect(res: express.Response): void
    /**
     * Get token with authorized code from freee, save it to firebase and login firebase
     */
    callback(code: string, res: express.Response): void
    /**
     * path for redirect on freee authorization
     */
    getRedirectPath(): string
    /**
     * path for callback on freee authorization
     */
    getCallbackPath(): string
    /**
     * path for callback on freee authorization
     */
    getCompaniesPath(): string

    /**
     * Create crypto key to bucket for it by specified date
     *
     * {@link SDKConfig#firebase#cryptoKeyBucket} must be specified
     */
    createCryptoKey(date: Date): Promise<void>
  }
}
