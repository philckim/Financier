import React, { useState, useCallback, useEffect, useContext } from "react";
import { PlaidLink } from "react-plaid-link";

import AccountsList from "../shared/AccountsList";
import { AuthContext } from "../functions/auth-context";
import { useAxiosClient } from "../hooks/axios-hook";
import ErrorModal from "../layout/ErrorModal";
import LoadingSpinner from "../layout/LoadingSpinner";
import "../css/home.css";

const HomeScreen = (props) => {
  const [accounts, setAccounts] = useState([]);
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useAxiosClient();
  const [linkToken, setLinkToken] = useState();

  useEffect(() => {
    if (!auth.token) return;
    const createLinkToken = async () => {
      const responseData = await sendRequest(
        "GET",
        "http://localhost:5000/api/plaid/create-link-token",
        {
          userId: auth.userId,
        },
        {
          "x-auth-token": auth.token,
        }
      );
      setLinkToken(responseData);
    };

    createLinkToken();
  }, [auth.userId, auth.token, sendRequest]);

  /**  on component load check for accounts associated with logged in user   */
  useEffect(() => {
    if (!linkToken) return;
    const getAccounts = async () => {
      const responseData = await sendRequest(
        "GET",
        "http://localhost:5000/api/plaid/accounts",
        {
          userId: auth.userId,
        },
        {
          "x-auth-token": auth.token,
        }
      );
      setAccounts(responseData.accounts);
    };

    getAccounts();
  }, [auth.userId, auth.token, sendRequest, linkToken]);

  const onSuccess = useCallback(
    async (publicToken, metadata) => {
      const responseData = await sendRequest(
        "POST",
        "http://localhost:5000/api/plaid/token-exchange",
        {
          publicToken: publicToken,
          metadata,
          token: auth.token,
        },
        {
          "x-auth-token": auth.token,
        }
      );
      if (responseData.ok) {
        console.log("Error");
      }
    },
    [auth.token, sendRequest]
  );

  /** Dynamically displays accounts based on fetched account data */
  let content;
  if (!accounts.length) {
    content = (
      <React.Fragment>
        <h3>No Accounts found!</h3>
        <h4>
          Link your account now with plaid, Click the 'Link via Plaid' button to
          get started.
        </h4>
        {linkToken && (
          <PlaidLink token={linkToken} onSuccess={onSuccess}>
            Link via Plaid
          </PlaidLink>
        )}
      </React.Fragment>
    );
  } else {
    content = (
      <div className="home-accounts">
        <AccountsList accounts={accounts} userId={auth.userId} />
        <PlaidLink
          className="home-card"
          token={linkToken}
          onSuccess={onSuccess}>
          Link via Plaid
        </PlaidLink>
      </div>
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

export default HomeScreen;
