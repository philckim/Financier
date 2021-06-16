import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AccountsList from "../shared/AccountsList";
import { AuthContext } from "../functions/auth-context";
import Button from "../shared/Button";
import Card from "../shared/Card";
import ErrorModal from "../layout/ErrorModal";
import LoadingSpinner from "../layout/LoadingSpinner";
import TransactionList from "../shared/TransactionList";
import { useAxiosClient } from "../hooks/axios-hook";

import "../css/account.css";

const AccountScreen = (props) => {
  const [accounts, setAccounts] = useState([]);
  const { accountId } = useParams();
  const auth = useContext(AuthContext);
  const [header, setHeader] = useState("LOADING");
  const [transactions, setTransactions] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useAxiosClient();

  useEffect(() => {
    if (!accountId) return;
    const fetchAccount = async () => {
      try {
        const responseData = await sendRequest(
          "GET",
          `http://localhost:5000/api/accounts/${accountId}`,
          {
            userId: auth.userId,
          },
          {
            "x-auth-token": auth.token,
          }
        );
        setHeader(responseData.institutionResponse.institution.name);
        setAccounts(responseData.balanceResponse.accounts);
        setTransactions(responseData.transactionResponse.transactions);
      } catch (err) {}
    };
    fetchAccount();
  }, [accountId, auth.token, auth.userId, sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="account-nav">
        <Button inverse className="account-nav__button" to="/">
          RETURN
        </Button>
      </div>
      <Card className="account-card">
        <div className="account-card__header">{header}</div>
        {accounts.length && (
          <div className="account-card__list">
            <AccountsList dark accounts={accounts} />
          </div>
        )}
        {transactions.length && (
          <React.Fragment>
            <div className="account-card__text">Transaction Overview</div>
            <TransactionList transactions={transactions} />
          </React.Fragment>
        )}
      </Card>
    </React.Fragment>
  );
};

export default AccountScreen;
