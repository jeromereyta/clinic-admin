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

  getPatientVisitList() {
    let options = {headers: authHeader()}
    return axiosInstance
      .get(`patient-visits`, options)
      .then(response => {
        return response.data;
      }).catch(function(error) {
        return error.response;
      });
  }

  getPatientByPatientCode(patientCode) {
    let options = {headers: authHeader()}
    return axiosInstance
      .get(`patients/` + patientCode, options)
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

  createPatientVisit(patientVisit) {
    let options = {headers: authHeader()}

    return axiosInstance
      .post(`patient-visits`, patientVisit, options)
      .then(response => {
        return response.data;
      }).catch(function(error) {
        return error.response;
      });
  }

  createPatientProcedures(patientProcedure) {
    let options = {headers: authHeader()}

    return axiosInstance
      .post(`patient-procedures`, patientProcedure, options)
      .then(response => {
        return response.data;
      }).catch(function(error) {
        return error.response;
      });
  }

  getPatientQueues() {
    let options = {headers: authHeader()}
    return axiosInstance
      .get(`procedure-queues`, options)
      .then(response => {
        return response.data;
      }).catch(function(error) {
        return error.response;
      });
  }

  uploadPatientImage(data) {
    let user = JSON.parse(localStorage.getItem('user'));

    let options = {
      headers: {
        Authorization: 'Bearer ' + user.access_token,
        'Content-type' :  'multipart/form-data',
        'Accept' : '*/*'
      }
    }

    return axiosInstance
      .post(`patients/upload-profile`, data , options)
      .then(response => {
        return response.data;
      }).catch(function(error) {
        return error.response;
      });
  }

  updatePatient(patient) {
    let options = {headers: authHeader()}
    return axiosInstance
      .put(`patients/` + patient.id, patient, options)
      .then(response => {
        return response.data;
      }).catch(function(error) {
        return error.response;
      });
  }
}


export default new PatientService();
