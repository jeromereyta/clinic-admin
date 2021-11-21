export function addPatient(state, patient) {
  state.patients.push(patient.data);
}

export function addPatientVisit(state, patientVisit) {
  state.patientVisits.push(patientVisit.data);
}

export function reinstatePatients(state, patients) {

  if (patients.data !== undefined) {
    state.patients = patients.data;
  }
}

export function reinstatePatientVisits(state, patientVisits) {
  if (patientVisits.data !== undefined) {
    state.patientVisits = patientVisits.data;
  }
}
