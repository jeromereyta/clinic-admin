import {axiosInstance} from "boot/axios";
import authHeader from './auth-header';

const API = `http://phplaravel-705740-2336961.cloudwaysapps.com`;

class CategoryProcedureService {
  getList() {
    let options = {headers: authHeader()}
    return axiosInstance
      .get(`category-procedures`, options)
      .then(response => {
        return response.data;
      }).catch(function(error) {
        return error.response;
      });
  }

  createCategoryProcedure(categoryProcedures) {
    let options = {headers: authHeader()}

    return axiosInstance
      .post(`category-procedures`, categoryProcedures, options)
      .then(response => {
        return response.data;
      }).catch(function(error) {
        return error.response;
      });
  }
}

export default new CategoryProcedureService();
