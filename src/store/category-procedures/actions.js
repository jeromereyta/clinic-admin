import CategoryProcedureService from "src/services/category-procedure.service";

export function list ({commit}) {
  return CategoryProcedureService.getList().then(
    categoryProcedures => {
      commit('fetchCategoryProcedures', categoryProcedures.data)
      return Promise.resolve(categoryProcedures);
    },
    error => {
      return Promise.reject(error);
    }
  );
}

export function add ({commit}, categoryProcedure) {
  return CategoryProcedureService.createCategoryProcedure(categoryProcedure).then(
    categoryProcedure => {
      if (categoryProcedure.data.id !== undefined) {
        commit('addCategoryProcedures', categoryProcedure.data)
      }
      return Promise.resolve(categoryProcedure);
    },
    error => {
      return Promise.reject(error);
    }
  );
}
