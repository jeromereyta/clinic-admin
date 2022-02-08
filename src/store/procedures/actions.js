import ProcedureService from "src/services/procedure.service";
import CategoryProcedureService from "src/services/category-procedure.service";

export function list ({commit}) {
  return ProcedureService.getList().then(
    procedures => {
      commit('fetchProcedures', procedures.data)
      return Promise.resolve(procedures);
    },
    error => {
      return Promise.reject(error);
    }
  );
}

export function add ({commit}, procedure) {
  return ProcedureService.createProcedure(procedure).then(
    procedure => {
      if (procedure.data.id !== undefined) {
        commit('addProcedure', procedure.data)
      }
      return Promise.resolve(procedure);
    },
    error => {
      return Promise.reject(error);
    }
  );
}

export function deleteProcedure ({commit}, procedure) {
  return ProcedureService.deleteProcedure(procedure).then(
    procedure => {
      return Promise.resolve(procedure);
    },
    error => {
      return Promise.reject(error);
    }
  );
}

export function updateProcedure({commit}, procedure) {
  return ProcedureService.updateProcedure(procedure).then(
    procedure => {
      return Promise.resolve(procedure);
    },
    error => {
      return Promise.reject(error);
    }
  );
}


export function packageList ({commit}) {
  return ProcedureService.getPackageList().then(
    packages => {
      commit('fetchPackages', packages.data)
      return Promise.resolve(packages);
    },
    error => {
      return Promise.reject(error);
    }
  );
}
