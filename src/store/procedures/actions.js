import ProcedureService from "src/services/procedure.service";

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


