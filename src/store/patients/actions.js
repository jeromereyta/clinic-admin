import PatientService from '../../services/patient.service';

export function list({commit}, user) {
  return PatientService.getList().then(
    patients => {
      // commit('patientListSuccess', patients);
      return Promise.resolve(patients);
    },
    error => {
      // commit('patientListFailure');
      return Promise.reject(error);
    }
  );
}

export function add({commit}, patient) {
  return PatientService.createPatient(patient).then(
    patients => {
      commit('patientListSuccess', patients);
      return Promise.resolve(patients);
    },
    error => {
      commit('patientListFailure');
      return Promise.reject(error);
    }
  );
}
