import { AxiosPromise, AxiosStatic } from 'axios'
import { ParamJSON } from '../const/types'
import { TokenManager } from '../services/token-manager'

export class FreeeAPIClient {
  private tokenManager: TokenManager
  private axios: AxiosStatic

  constructor(tokenManager: TokenManager, axios: AxiosStatic) {
    this.tokenManager = tokenManager
    this.axios = axios
  }

  /**
   * Call freee api by GET
   */
  get<T = any>(
    url: string,
    params: ParamJSON,
    userId: string,
    contentType: string = 'application/json'
  ): AxiosPromise<T> {
    return this.tokenManager.get(userId).then(accessToken => {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'X-Api-Version': '2020-06-15',
        'Content-Type': contentType
      }
      return this.axios.get(url, {
        params: params,
        headers: headers
      })
    })
  }

  /**
   * Call freee api by POST
   */
  post<T = any>(
    url: string,
    data: ParamJSON,
    userId: string,
    contentType: string = 'application/json'
  ): AxiosPromise<T> {
    return this.tokenManager.get(userId).then(accessToken => {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'X-Api-Version': '2020-06-15',
        'Content-Type': contentType
      }
      return this.axios.post(url, data, {
        headers: headers
      })
    })
  }

  /**
   * Call freee api by PUT
   */
  put<T = any>(
    url: string,
    data: ParamJSON,
    userId: string,
    contentType: string = 'application/json'
  ): AxiosPromise<T> {
    return this.tokenManager.get(userId).then(accessToken => {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'X-Api-Version': '2020-06-15',
        'Content-Type': contentType
      }
      return this.axios.put(url, data, {
        headers: headers
      })
    })
  }

  /**
   * Call freee api by DELETE
   */
  delete(url: string,
    data: ParamJSON,
    userId: string,
    contentType: string = 'application/json'
  ): AxiosPromise {
    return this.tokenManager.get(userId).then(accessToken => {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'X-Api-Version': '2020-06-15',
        'Content-Type': contentType
      }
      return this.axios.delete(url, {
        data: data,
        headers: headers
      })
    })
  }
}
