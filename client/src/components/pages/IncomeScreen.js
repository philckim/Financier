import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../functions/auth-context";
import Card from "../shared/Card";
import ErrorModal from "../layout/ErrorModal";
import LoadingSpinner from "../layout/LoadingSpinner";
import { useAxiosClient } from "../hooks/axios-hook";
import {
  getPositiveMonths,
  getTransactionsByType,
  getTotalAmount,
  sortTransactions,
  getRiskCategory,
  getRiskTotal,
} from "../functions/transactions";

import "../css/income.css";

const IncomeScreen = (props) => {
  const auth = useContext(AuthContext);
  const [transactions, setTransactions] = useState();
  const { isLoading, error, sendRequest, clearError } = useAxiosClient();

  useEffect(() => {
    if (!auth.token) return;
    const getTransactions = async () => {
      try {
        const responseData = await sendRequest(
          "GET",
          "http://localhost:5000/api/income/12",
          {
            userId: auth.userId,
          },
          {
            "x-auth-token": auth.token,
          }
        );
        setTransactions(responseData.transactionResponse.transactions);
      } catch (err) {}
    };
    getTransactions();
  }, [auth.token, auth.userId, sendRequest]);

  let content;
  if (!transactions) {
    content = <h2>LOADING</h2>;
  } else {
    content = (
      <Card className="account-card">
        <div className="account-card__header">INCOME</div>
        <div className="income-details">
          <IncomeCards transactions={transactions} />
          <RiskAssessment transactions={transactions} />
        </div>
      </Card>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {content}
    </React.Fragment>
  );
};

export default IncomeScreen;

/** A container that holds various stats about transactions */
const IncomeCards = (props) => {
  return (
    <div className="income-cards__container">
      <div className="income-card">
        <div className="income-card__header">Transactions</div>
        {props.transactions?.length || 0}
      </div>
      <div className="income-card">
        <div className="income-card__header">Income</div>
        {getTotalAmount(
          getTransactionsByType(props.transactions, "income")
        ).toFixed(2)}
      </div>
      <div className="income-card">
        <div className="income-card__header">Spending</div>
        {getTotalAmount(
          getTransactionsByType(props.transactions, "expenditure")
        ).toFixed(2)}
      </div>
      <div className="income-card">
        <div className="income-card__header">Totals</div>
        {getTotalAmount(props.transactions).toFixed(2)}
      </div>
    </div>
  );
};

/** Displays user risk assessment based on the algo */
const RiskAssessment = (props) => {
  /** Total Inbound */
  let annualIncome = getTotalAmount(
    getTransactionsByType(props.transactions, "income")
  ).toFixed(2);

  /** Total Outbound */
  let annualSpend = getTotalAmount(
    getTransactionsByType(props.transactions, "expenditure")
  ).toFixed(2);

  /** Total positive months */
  let positiveMonths = getPositiveMonths(sortTransactions(props.transactions));

  /** Risk category based on annual info */
  let riskCategory = getRiskCategory(annualIncome, annualSpend);

  /** Risk score from category, monthly */
  let riskScore = getRiskTotal(riskCategory, positiveMonths);

  return (
    <div className="income-risk">
      <div className="income-risk__header">RISK ANALYSIS</div>
      <div className="income-risk__details">
        ANNUAL NET: {annualIncome}
        <br />
        POSITIVES MONTHS: {positiveMonths}
        <br />
        RISK CATEGORY: {riskCategory}
        <br />
        CALCULATED SCORE: {riskScore}
      </div>
    </div>
  );
};
