import PatientService from '../../services/patient.service';
import ProcedureService from "src/services/procedure.service";

export function list({commit}) {
  return PatientService.getList({commit}).then(
    patients => {
      commit('reinstatePatients', patients);
      return Promise.resolve(patients);
    },
    error => {
      return Promise.reject(error);
    }
  );
}
export function patientInfo({commit}, patientCode) {
  return PatientService.getPatientByPatientCode(patientCode).then(
    patient => {
      return Promise.resolve(patient);
    },
    error => {
      return Promise.reject(error);
    }
  );
}
export function patientVisitlist({commit}) {
  return PatientService.getPatientVisitList({commit}).then(
    patientVisits => {
      commit('reinstatePatientVisits', patientVisits);
      return Promise.resolve(patientVisits);
    },
    error => {
      return Promise.reject(error);
    }
  );
}

export function add({commit}, patient) {
  return PatientService.createPatient(patient).then(
    patient => {
      if (patient.data.id !== undefined) {
        commit('addPatient', patient);
      }
      return Promise.resolve(patient);
    },
    error => {
      return Promise.reject(error);
    }
  );
}

export function update({commit}, patient) {
  return PatientService.updatePatient(patient).then(
    patient => {
      return Promise.resolve(patient);
    },
    error => {
      return Promise.reject(error);
    }
  );
}

export function updateImage({commit}, data) {
  return PatientService.uploadPatientImage(data).then(
    patient => {
      return Promise.resolve(patient);
    },
    error => {
      return Promise.reject(error);
    }
  );
}

export function addPatientVisit({commit}, patientVisit) {
  return PatientService.createPatientVisit(patientVisit).then(
    patientVisit => {
      if (patientVisit.data.patient_code !== undefined) {
        commit('addPatientVisit', patientVisit);
      }
      return Promise.resolve(patientVisit);
    },
    error => {
      return Promise.reject(error);
    }
  );
}

export function addPatientVisitFile({commit}, patientVisit) {
  return PatientService.createPatientVisitFile(patientVisit).then(
    patientVisit => {
      return Promise.resolve(patientVisit);
    },
    error => {
      return Promise.reject(error);
    }
  );
}

export function addPatientProcedure({commit}, patientProcedure) {
  return PatientService.createPatientProcedures(patientProcedure).then(
    patientProcedure => {
      return Promise.resolve(patientProcedure);
    },
    error => {
      return Promise.reject(error);
    }
  );
}

export function addPatientPackage({commit}, packageData) {
  return PatientService.createPatientPackage(packageData).then(
    packageData => {
      return Promise.resolve(packageData);
    },
    error => {
      return Promise.reject(error);
    }
  );
}

export function patientVisitsByPatient({commit}, patientCode) {
  return PatientService.getPatientVisitsByPatient(patientCode).then(
    patientVisits => {
      return Promise.resolve(patientVisits);
    },
    error => {
      return Promise.reject(error);
    }
  );
}

export function patientVisitByID({commit}, patientVisitId) {
  return PatientService.getPatientVisitsByID(patientVisitId).then(
    patientVisit => {
      return Promise.resolve(patientVisit);
    },
    error => {
      return Promise.reject(error);
    }
  );
}

export function createPatientTransaction({commit}, transaction) {
  return PatientService.createPatientTransaction(transaction).then(
    transaction => {
      return Promise.resolve(transaction);
    },
    error => {
      return Promise.reject(error);
    }
  );
}


export function deleteProcedure ({commit}, patient_procedure_id) {
  return PatientService.deleteProcedure(patient_procedure_id).then(
    procedure => {
      return Promise.resolve(procedure);
    },
    error => {
      return Promise.reject(error);
    }
  );
}
