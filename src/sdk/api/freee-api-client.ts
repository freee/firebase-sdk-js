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
    userId: string
  ): AxiosPromise<T> {
    return this.tokenManager.get(userId).then(accessToken => {
      return this.axios.get(url, {
        params: params,
        headers: { Authorization: `Bearer ${accessToken}` }
      })
    })
  }

  /**
   * Call freee api by POST
   */
  post<T = any>(url: string, data: ParamJSON, userId: string): AxiosPromise<T> {
    return this.tokenManager.get(userId).then(accessToken => {
      return this.axios.post(url, data, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
    })
  }

  /**
   * Call freee api by PUT
   */
  put<T = any>(url: string, data: ParamJSON, userId: string): AxiosPromise<T> {
    return this.tokenManager.get(userId).then(accessToken => {
      return this.axios.put(url, data, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
    })
  }

  /**
   * Call freee api by GET
   */
  delete(url: string, data: ParamJSON, userId: string): AxiosPromise {
    return this.tokenManager.get(userId).then(accessToken => {
      return this.axios.delete(url, {
        data: data,
        headers: { Authorization: `Bearer ${accessToken}` }
      })
    })
  }
}
