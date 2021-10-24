import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: `http://localhost:80/api/`,
  withCredentials: false
})

export default ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
}

export { axiosInstance }
