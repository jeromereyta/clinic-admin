
export function fetchProcedures(state, procedures) {
  state.procedures = procedures;
}

export function addProcedure(state, procedure) {
  state.procedures.push(procedure);
}

export function fetchPackages(state, packages) {
  state.packages = packages;
}
