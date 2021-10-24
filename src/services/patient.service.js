import {axiosInstance} from "boot/axios";
import authHeader from './auth-header';

const API = `http://localhost:80/api`;

class PatientService {
  getList() {
    let options = {headers: authHeader()}
    return axiosInstance
      .get(`patients`, options)
      .then(response => {
        return response.data;
      }).catch(function(error) {
        return error.response;
      });
  }

  createPatient(patients) {
    let options = {headers: authHeader()}

    return axiosInstance
      .post(`patients`, patients, options)
      .then(response => {
        return response.data;
      }).catch(function(error) {
        return error.response;
      });
  }
}

export default new PatientService();
