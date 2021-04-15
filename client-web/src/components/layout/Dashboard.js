import React, { useState, useCallback, useEffect, useContext } from "react";

import { PlaidLink } from "react-plaid-link";
import { useAxiosClient } from "../hooks/axios-hook";

import { AuthContext } from "../functions/auth-context";

const Dashboard = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useAxiosClient();
  const [linkToken, setLinkToken] = useState("");
  const [plaidData, setPlaidData] = useState();

  console.log(auth);
  useEffect(() => {
    if (!auth.userId) return;
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
      console.log("Attempting token exchange...");
      console.log("linkToken: ", linkToken);
      const { data } = await sendRequest(
        "POST",
        "http://localhost:5000/api/plaid/token-exchange",
        {
          publicToken: publicToken,
          metadata,
          token: auth.token
        },
        {
          'x-auth-token': auth.token
        }
      );
      setPlaidData(data);
    },
    [linkToken, sendRequest]
  );

  return (
    <div>
      <h2>Welcome {auth.isLoggedIn && auth.name}</h2>
      <h3>No Accounts found!</h3>
      <h4>
        Link your account now with plaid, Click the 'Link via Plaid' button to
        get started.
      </h4>
      <PlaidLink token={linkToken} onSuccess={onSuccess}>
        Link via Plaid
      </PlaidLink>
    </div>
  );
};

export default Dashboard;
