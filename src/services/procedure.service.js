import {axiosInstance} from "boot/axios";
import authHeader from './auth-header';

const API = `http://phplaravel-705740-2336961.cloudwaysapps.com`;

class ProcedureService {
  getList() {
    let options = {headers: authHeader()}
    return axiosInstance
      .get(`procedures`, options)
      .then(response => {
        return response.data;
      }).catch(function(error) {
        return error.response;
      });
  }

  createProcedure(procedure) {
    let options = {headers: authHeader()}

    return axiosInstance
      .post(`procedures`, procedure, options)
      .then(response => {
        return response.data;
      }).catch(function(error) {
        return error.response;
      });
  }
}

export default new ProcedureService();
