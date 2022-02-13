import {axiosInstance} from "boot/axios";
import authHeader from './auth-header';


class TransactionService {
  getList() {
    let options = {headers: authHeader()}
    return axiosInstance
      .get(`transactions`, options)
      .then(response => {
        return response.data;
      }).catch(function(error) {
        return error.response;
      });
  }
}


export default new TransactionService();
