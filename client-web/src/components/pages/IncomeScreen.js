import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../functions/auth-context";
import Card from "../shared/Card";
import ErrorModal from "../layout/ErrorModal";
import LoadingSpinner from "../layout/LoadingSpinner";
import { useAxiosClient } from "../hooks/axios-hook";
import {
  getTransactionsByType,
  getTotalAmount,
} from "../functions/transactions";

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
          `http://localhost:5000/api/income/12`,
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
        {console.log(transactions)}
        TRANSACTIONS: {transactions?.length || 0}
        <br />
        INCOME:{" "}
        {getTotalAmount(getTransactionsByType(transactions, "income")).toFixed(
          2
        )}
        <br />
        SPENDING:{" "}
        {getTotalAmount(
          getTransactionsByType(transactions, "expenditure")
        ).toFixed(2)}
        <br />
        TOTALS: {getTotalAmount(transactions).toFixed(2)}
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
