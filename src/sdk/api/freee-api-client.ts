import { AxiosPromise, AxiosStatic } from 'axios'
import { ParamJSON } from '../const/types'
import { TokenManager } from '../services/token-manager'
import * as FormData from 'form-data';

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
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'X-Api-Version': '2020-06-15',
        'Content-Type': 'application/json'
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
  post<T = any>(url: string, data: ParamJSON, userId: string): AxiosPromise<T> {
    return this.tokenManager.get(userId).then(accessToken => {

      let sendData = data
      let sendHeaders: { [key: string]: any }  = {}
      let sendCcontentType = 'application/json'

      const isMultipartRequest = url === 'api/1/receipts'
      if (isMultipartRequest) {
        const formData = new FormData()
        Object.keys(data).forEach(key => {
          formData.append(key, data[key])
        })
        sendData = formData
        sendHeaders = formData.getHeaders()
        sendCcontentType = 'multipart/form-data'
      }

      sendHeaders['Authorization'] = `Bearer ${accessToken}`
      sendHeaders['X-Api-Version'] = '2020-06-15'
      sendHeaders['Content-Type'] = sendCcontentType

      return this.axios.post(url, sendData, {
        headers: sendHeaders
      })
    })
  }

  /**
   * Call freee api by PUT
   */
  put<T = any>(url: string, data: ParamJSON, userId: string): AxiosPromise<T> {
    return this.tokenManager.get(userId).then(accessToken => {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'X-Api-Version': '2020-06-15',
        'Content-Type': 'application/json'
      }
      return this.axios.put(url, data, {
        headers: headers
      })
    })
  }

  /**
   * Call freee api by GET
   */
  delete(url: string, data: ParamJSON, userId: string): AxiosPromise {
    return this.tokenManager.get(userId).then(accessToken => {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'X-Api-Version': '2020-06-15',
        'Content-Type': 'application/json'
      }
      return this.axios.delete(url, {
        data: data,
        headers: headers
      })
    })
  }
}
