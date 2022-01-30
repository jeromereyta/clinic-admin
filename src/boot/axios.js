import axios from 'axios'

let url = process.env.API_URL ?? null;

let apiUrl = `https://phplaravel-705740-2336961.cloudwaysapps.com/api/`;

if (url !== null) {
  apiUrl = process.env.API_URL + 'api/';
}

const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: false
})

export default ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
}

export { axiosInstance }

