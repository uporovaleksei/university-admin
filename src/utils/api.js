import {useAuthStore} from '@/store/index'
import axios from 'axios'

const client = axios.create({
  baseURL: process.env.VUE_APP_SERVER_URL,
  withCredentials: true,
  timeout: 100000 * 60 * 20,
})

client.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.log(error)
    if (error.response.status === 403) {
      useAuthStore().logout()
    }
    throw new Error(`Axios: ${error.message}. ${error.response.data}`)
  }
)

export default client