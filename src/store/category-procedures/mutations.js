
export function fetchCategoryProcedures(state, categoryProcedures) {
  state.categoryProcedures = categoryProcedures;
}

export function addCategoryProcedures(state, categoryProcedure) {
  state.categoryProcedures.push(categoryProcedure);
}
