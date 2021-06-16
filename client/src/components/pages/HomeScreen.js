import React, { useState, useCallback, useEffect, useContext } from "react";
import { PlaidLink } from "react-plaid-link";

import AccountsList from "../shared/AccountsList";
import { AuthContext } from "../functions/auth-context";
import Card from "../shared/Card";
import ErrorModal from "../layout/ErrorModal";
import LoadingSpinner from "../layout/LoadingSpinner";
import { useAxiosClient } from "../hooks/axios-hook";
import "../css/home.css";

const HomeScreen = (props) => {
  const [accounts, setAccounts] = useState([]);
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useAxiosClient();
  const [linkToken, setLinkToken] = useState();

  useEffect(() => {
    if (!auth.token) return;
    const createLinkToken = async () => {
      try {
        const responseData = await sendRequest(
          "GET",
          "http://localhost:5000/api/token/create-link-token",
          {
            userId: auth.userId,
          },
          {
            "x-auth-token": auth.token,
          }
        );
        setLinkToken(responseData);
      } catch (err) {}
    };

    createLinkToken();
  }, [auth.userId, auth.token, sendRequest]);

  /**  on component load check for accounts associated with logged in user   */
  useEffect(() => {
    if (!linkToken) return;
    const getAccounts = async () => {
      try {
        const responseData = await sendRequest(
          "GET",
          "http://localhost:5000/api/accounts",
          {
            userId: auth.userId,
          },
          {
            "x-auth-token": auth.token,
          }
        );
        setAccounts(responseData.accounts);
      } catch (err) {}
    };

    getAccounts();
  }, [auth.userId, auth.token, sendRequest, linkToken]);

  const onSuccess = useCallback(
    async (publicToken, metadata) => {
      try {
        const responseData = await sendRequest(
          "POST",
          "http://localhost:5000/api/token/token-exchange",
          {
            publicToken: publicToken,
            metadata,
            token: auth.token,
          },
          {
            "x-auth-token": auth.token,
          }
        );
        console.log(responseData);
      } catch (err) {}
    },
    [auth.token, sendRequest]
  );

  /** Dynamically displays accounts based on fetched account data */
  let content;
  if (!accounts.length) {
    content = (
      <div className="home-empty">
        <div>
          <h3>No Accounts found!</h3>
          <h4>
            Link your account now with plaid, Click the 'Link via Plaid' button
            to get started.
          </h4>
        </div>
        {linkToken && (
          <Card className="plaid-card">
            <PlaidLink
              className="plaid-card__content"
              token={linkToken}
              onSuccess={onSuccess}>
              Link via Plaid
            </PlaidLink>
          </Card>
        )}
      </div>
    );
  } else {
    content = (
      <div className="home-accounts">
        <AccountsList accounts={accounts} userId={auth.userId} />
        <Card className="plaid-card">
          <PlaidLink
            className="plaid-card__content"
            token={linkToken}
            onSuccess={onSuccess}>
            Link via Plaid
          </PlaidLink>
        </Card>
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
