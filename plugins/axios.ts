import axios from 'axios'
import Cookies from 'js-cookie'

interface Headers {
  Authorization?: string
}

interface Response {
  accessToken?: string
  refreshToken?: string
}

const removeCookies = () => {
  Cookies.remove('accessToken')
  Cookies.remove('refreshToken')
}

const setHeaders = (headers: Headers) => {
  headers.Authorization = 'Bearer ' + Cookies.get('accessToken')
  return headers
}

const setCookies = (response: Response) => {
  if (response.accessToken) {
    setCookie('accessToken', response.accessToken)
  }
  if (response.refreshToken) {
    setCookie('refreshToken', response.refreshToken)
  }
}

const setCookie = (name: string, value: string) => {
  // https 사용시에 secure true로 설정하면 쿠키값 보호할 수 있다.
  Cookies.set(name, value, { secure: false })
}

const axiosInstance = axios.create({
  baseURL: process.env.apiUrl
})

axiosInstance.interceptors.request.use((config) => {
  config.headers = setHeaders(config.headers)
  return config
}, (error) => {
  return Promise.reject(error)
})

axiosInstance.interceptors.response.use((response) => {
  setCookies(response.data)
  return response
}, (error) => {
  if (error.response.status === 401) {
    removeCookies()
    window.location.href = '/login'
  }
  return Promise.reject(error)
})

export default axiosInstance
