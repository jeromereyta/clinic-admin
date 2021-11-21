import {axiosInstance} from "boot/axios";
import authHeader from './auth-header';

const API = `http://localhost:80/api`;

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
