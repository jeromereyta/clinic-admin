import {axiosInstance} from "boot/axios";
import authHeader from './auth-header';

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

  deleteCategoryProcedure(categoryProcedure) {
    let options = {headers: authHeader()}

    return axiosInstance
      .delete(`category-procedures/` + categoryProcedure.id, options)
      .then(response => {
        return response.data;
      }).catch(function(error) {
        return error.response;
      });
  }

  updateCategoryProcedure(categoryProcedure) {
    let options = {headers: authHeader()}

    return axiosInstance
      .put(`category-procedures/` + categoryProcedure.id, categoryProcedure, options)
      .then(response => {
        return response.data;
      }).catch(function(error) {
        return error.response;
      });
  }
}

export default new CategoryProcedureService();
