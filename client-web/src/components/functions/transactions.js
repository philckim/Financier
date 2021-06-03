const moment = require("moment");

/** Filter based on type */
export const getTransactionsByType = (transactions, type) => {
  if (!transactions.length) {
    return 0;
  }

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

/** Get totals */
export const getTotalAmount = (filteredTransactions) => {
  if (!filteredTransactions.length) {
    return 0;
  }

  return filteredTransactions.reduce(
    (current, { amount }) => current + amount,
    0
  );
};

/** Categorize transactions by month */
export const sortTransactions = (transactions) => {
  if (!transactions.length) {
    return 0;
  }

  let today = moment();

  /** Final array of object containing monthly transactions */
  let sortedTransactions = [[], [], [], [], [], [], [], [], [], [], [], []];

  /** This is pretty obtuse but it's as concise as I can get it
   * We're iterating over the transactions, finding the month, comparing it,
   * then adding it to its respective month in the array. The difference comes in negatives
   * so we need to invert the result
   */
  for (let index = 0; index < transactions.length; index++) {
    sortedTransactions[
      -moment(transactions[index].date).diff(today, "months")
    ].push(transactions[index]);
  }

  return sortedTransactions;
};

/** Gets the total number of positive months from an array
 * Requirements: Sorted first
 */
export const getPositiveMonths = (sortedTransactions) => {
  if (!sortTransactions.length) {
    return 0;
  }

  /** Number of months in the positive. */
  let positiveMonths = 0;

  for (let index = 0; index < sortedTransactions.length; index++) {
    if (getTotalAmount(sortedTransactions[0]) > 0) {
      positiveMonths++;
    }
  }

  return positiveMonths;
};

/** Returns the risk category based on flow chart */
export const getRiskCategory = (annualIncome, annualSpend) => {
  /** annualIncome - annualSpend */
  let annualTotal = annualIncome - annualSpend;

  switch (true) {
    /** 2. X >= 50% of annual income */
    case annualTotal >= annualIncome / 2:
      return 2;
    /** 3. 10% <= X <= 49% of annual income */
    case annualIncome * 0.1 <= annualTotal &&
      annualTotal <= annualIncome * 0.49:
      return 3;
    /** 4. 2% <= X <= 9% of annual income */
    case annualIncome * 0.02 <= annualTotal &&
      annualTotal <= annualIncome * 0.09:
      return 4;
    /** 5. 0 <= X <= 1% of annual income */
    case 0 <= annualTotal && annualTotal <= annualIncome * 0.01:
      return 5;
    /** 6. 1% <= |-X| <= 9% more than annual income */
    case annualIncome * 0.01 <= Math.abs(-annualTotal) &&
      Math.abs(-annualTotal) <= annualIncome * 1.9:
      return 6;
    /** 7. |-x| >= 10% more than annual income */
    case Math.abs(-annualTotal) >= annualIncome * 1.1:
      return 7;
    default:
      return 0;
  }
};

/** Calculates the risk within the category using monthly.
 *
 * Prerequisite: A risk category
 */
export const getRiskTotal = (riskCategory, positiveMonths) => {
  if (!riskCategory) {
    return -1;
  }
  switch (riskCategory) {
    case 2:
      return positiveMonths >= 6 ? 100 : 95;
    case 3:
      return positiveMonths >= 6 ? 85 : 80;
    case 4:
      return positiveMonths >= 6 ? 75 : 70;
    case 5:
      return positiveMonths >= 6 ? 50 : 45;
    case 6:
      return positiveMonths >= 6 ? 25 : 20;
    case 7:
      return 0;
    default:
      return -1;
  }
};
