import TransactionService from "src/services/transaction.service";

export function list({commit}) {
  return TransactionService.getList({commit}).then(
    transactions => {
      commit('reinstateTransactions', transactions);
      return Promise.resolve(transactions);
    },
    error => {
      return Promise.reject(error);
    }
  );
}
