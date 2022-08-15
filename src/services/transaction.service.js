import {axiosInstance} from "boot/axios";
import authHeader from './auth-header';


class TransactionService {
  getList(dateRange) {
    let options = {headers: authHeader()}
    if (dateRange?.fromDate) {
      return axiosInstance
        .get(`transactions?from=`+dateRange.fromDate+`&to=`+dateRange.toDate, options)
        .then(response => {
          return response.data;
        }).catch(function(error) {
          return error.response;
        });
    }

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
