import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AccountsList from "../shared/AccountsList";
import { AuthContext } from "../functions/auth-context";
import Button from "../shared/Button";
import Card from "../shared/Card";
import ErrorModal from "../layout/ErrorModal";
import LoadingSpinner from "../layout/LoadingSpinner";
import { useAxiosClient } from "../hooks/axios-hook";

import "../css/account.css";

const AccountScreen = (props) => {
  const [accounts, setAccounts] = useState([]);
  const { accountId } = useParams();
  const [accountsMode, setAccountsMode] = useState(true);
  const auth = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useAxiosClient();

  const onClickHandler = () => {
    setAccountsMode((state) => !state);
  };

  useEffect(() => {
    if (!accountId) return;
    const fetchAccount = async () => {
      try {
        const responseData = await sendRequest(
          "GET",
          `http://localhost:5000/api/plaid/accounts/${accountId}`,
          {
            userId: auth.userId,
          },
          {
            "x-auth-token": auth.token,
          }
        );
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
        <Button
          inverse
          className="account-nav__button"
          onClick={onClickHandler}>
          {accountsMode ? "TRANSACTIONS" : "ACCOUNTS"}
        </Button>
      </div>
      <Card className="account-card">
        <div className="account-card__header">
          {accountId}
          <div>{accountsMode ? "ACCOUNTS" : "TRANSACTIONS"}</div>
        </div>
        <div className="account-card__content">
          {accountsMode ? (
            <div className="account-card__list">
              <AccountsList dark accounts={accounts} />
            </div>
          ) : (
            <TransactionList transactions={transactions} />
          )}
        </div>
      </Card>
    </React.Fragment>
  );
};

export default AccountScreen;

const TransactionList = (props) => {
  if (!props.transactions.length) {
    return (
      <div className="transaction-list center">
        <Card className="transaction-item__content">
          <div className="transaction-item__info">
            <h2>No transactions found.</h2>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <ul className="transaction-list">
      {props.transactions.map((transaction) => (
        <TransactionItem
          key={transaction.transaction_id}
          name={transaction.name}
          amount={transaction.amount}
        />
      ))}
    </ul>
  );
};

const TransactionItem = (props) => {
  return (
    <li className="transaction-item">
      <Card className="transaction-item__content">
        <div className="transaction-item__info">
          <h2>{props.name}</h2>
          <h3>${props.amount}</h3>
        </div>
      </Card>
    </li>
  );
};
