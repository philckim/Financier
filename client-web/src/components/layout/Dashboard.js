import React, { useState, useCallback, useEffect, useContext } from "react";
import { PlaidLink } from "react-plaid-link";

import { AuthContext } from "../functions/auth-context";
import { useAxiosClient } from "../hooks/axios-hook";
import ErrorModal from "../layout/ErrorModal";
import LoadingSpinner from "../layout/LoadingSpinner";
import "../css/dashboard.css";

const Dashboard = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useAxiosClient();
  const [linkToken, setLinkToken] = useState();
  const [plaidData, setPlaidData] = useState();

  /**
   * Literally just to clear out the unused warning
   */
  if (plaidData);

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

      setLinkToken(responseData.linkToken);
    };
    createLinkToken();
  }, [auth.userId, auth.token, sendRequest]);

  const onSuccess = useCallback(
    async (publicToken, metadata) => {
      const { data } = await sendRequest(
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
      setPlaidData(data);
    },
    [auth.token, sendRequest]
  );

  return (
    <div className="dashboard-screen">
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
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
    </div>
  );
};

export default Dashboard;
