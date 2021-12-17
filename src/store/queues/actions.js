import PatientService from '../../services/patient.service';

export function queueList({commit}) {
  return PatientService.getPatientQueues({commit}).then(
    queues => {
      commit('reinstateQueues', queues);
      return Promise.resolve(queues);
    },
    error => {
      return Promise.reject(error);
    }
  );
}

export function setPatientInProgress({commit}, patient_name, patient_code) {
    commit('setPatientInProgress', patient_name, patient_code);
}


export function updateProcedureQueue({commit}, procedureQueue) {
  return PatientService.updateProcedureQueue(procedureQueue).then(
    procedureQueue => {
      return Promise.resolve(procedureQueue);
    },
    error => {
      return Promise.reject(error);
    }
  );
}
