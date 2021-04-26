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
  const auth = useContext(AuthContext);
  const { accountId } = useParams();
  const [accountsMode, setAccountsMode] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useAxiosClient();

  const onClickHandler = () => {
    setAccountsMode((state) => !state);
  };

  useEffect(() => {
    if (!accountId) return;
    const fetchAccount = async () => {
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
      setTransactions(responseData.transactionResponse);
    };
    fetchAccount();
  }, [accountId, auth.token, auth.userId, sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="account-navbuttons">
        <Button inverse className="account-button" to="/">
          RETURN
        </Button>
        <Button inverse className="account-button" onClick={onClickHandler}>
          {accountsMode ? "TRANSACTIONS" : "ACCOUNTS"}
        </Button>
      </div>
      <Card className="account-card">
        <div className="account-card-container">
          <div className="account-card-header">{accountId}</div>
          <div className="account-card-content">
            <AccountsList dark accounts={accounts} />
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default AccountScreen;
