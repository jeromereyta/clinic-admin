import TransactionService from "src/services/transaction.service";

export function list({commit}, dateRange) {
  return TransactionService.getList(dateRange).then(
    transactions => {
      commit('reinstateTransactions', transactions);
      return Promise.resolve(transactions);
    },
    error => {
      return Promise.reject(error);
    }
  );
}
