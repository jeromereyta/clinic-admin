import {axiosInstance} from "boot/axios";
import authHeader from './auth-header';

const API = `http://phplaravel-705740-2336961.cloudwaysapps.com`;

class PackageService {
  getPackageList() {
    let options = {headers: authHeader()}
    return axiosInstance
      .get(`packages`, options)
      .then(response => {
        return response.data;
      }).catch(function(error) {
        return error.response;
      });
  }

  getList() {
    let options = {headers: authHeader()}
    return axiosInstance
      .get(`packages`, options)
      .then(response => {
        return response.data;
      }).catch(function(error) {
        return error.response;
      });
  }

  createPackage(packageData) {
    let options = {headers: authHeader()}

    return axiosInstance
      .post(`packages`, packageData, options)
      .then(response => {
        return response.data;
      }).catch(function(error) {
        return error.response;
      });
  }


  deletePackage(packageData) {
    let options = {headers: authHeader()}

    return axiosInstance
      .delete(`packages/` + packageData.id, options)
      .then(response => {
        return response.data;
      }).catch(function(error) {
        return error.response;
      });
  }

  updatePackage(packageData) {
    let options = {headers: authHeader()}

    return axiosInstance
      .put(`packages/` + packageData.id, packageData, options)
      .then(response => {
        return response.data;
      }).catch(function(error) {
        return error.response;
      });
  }
}

export default new PackageService();
