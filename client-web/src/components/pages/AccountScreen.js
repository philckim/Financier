import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import AccountsList from "../shared/AccountsList";
import { AuthContext } from "../functions/auth-context";
import Card from "../shared/Card";
import ErrorModal from "../layout/ErrorModal";
import LoadingSpinner from "../layout/LoadingSpinner";
import { useAxiosClient } from "../hooks/axios-hook";

import "../css/account.css";

const AccountScreen = (props) => {
  const auth = useContext(AuthContext);
  const { accountId } = useParams();
  const [accounts, setAccounts] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useAxiosClient();

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
    };
    fetchAccount();
  }, [accountId, auth.token, auth.userId, sendRequest]);

  return (
    <div className="account-screen">
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <Link className="account-button" inverse to="/">
        Return
      </Link>
      <Card className="account-card">
        <div className="account-card-header">{accountId}</div>
        <AccountsList dark accounts={accounts} />
      </Card>
    </div>
  );
};

export default AccountScreen;
