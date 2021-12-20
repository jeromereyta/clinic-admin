import {axiosInstance} from "boot/axios";
import authHeader from './auth-header';

const API = `http://phplaravel-705740-2336961.cloudwaysapps.com`;

class FileTypeService {
  getList() {
    let options = {headers: authHeader()}
    return axiosInstance
      .get(`file-types`, options)
      .then(response => {
        return response.data;
      }).catch(function(error) {
        return error.response;
      });
  }

  createFileType(fileType) {
    let options = {headers: authHeader()}

    return axiosInstance
      .post(`file-types`, fileType, options)
      .then(response => {
        return response.data;
      }).catch(function(error) {
        return error.response;
      });
  }
}

export default new FileTypeService();
