import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: `https://phplaravel-705740-2336961.cloudwaysapps.com/api/`,
  withCredentials: false
})

export default ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
}

export { axiosInstance }
