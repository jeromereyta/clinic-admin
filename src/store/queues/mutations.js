export function reinstateQueues(state, queues) {
  if (queues.data !== undefined) {
    state.queues = queues.data;
  }
}

export function setPatientInProgress(state, patient_name, patient_code) {
  state.patient_name = patient_name;
  state.patient_code = patient_code;
}

