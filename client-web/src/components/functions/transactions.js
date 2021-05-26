/* Filter based on type */
export const getTransactionsByType = (transactions, type) => {
  switch (type) {
    case "income":
      return transactions.filter(({ amount }) => {
        return amount < 0;
      });
    case "expenditure":
      return transactions.filter(({ amount }) => {
        return amount > 0;
      });
    default:
      return 0;
  }
};

/* Get totals */
export const getTotalAmount = (filteredTransactions) => {
  return filteredTransactions.reduce(
    (current, { amount }) => current + amount,
    0
  );
};
