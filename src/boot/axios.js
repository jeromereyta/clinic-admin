import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: `http://phplaravel-704289-2331431.cloudwaysapps.com/api/`,
  withCredentials: false
})

export default ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
}

export { axiosInstance }
