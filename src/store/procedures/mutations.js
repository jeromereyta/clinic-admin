
export function fetchProcedures(state, procedures) {
  state.procedures = procedures;
}

export function addProcedure(state, procedure) {
  state.procedures.push(procedure);
}
