
export function reinstateTransactions(state, transactions) {

  if (transactions.data !== undefined) {
    state.transactions = transactions.data;
  }
}

