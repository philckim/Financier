import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../functions/auth-context";
import Button from "../shared/Button";
import Card from "../shared/Card";
import ErrorModal from "../layout/ErrorModal";
import LoadingSpinner from "../layout/LoadingSpinner";
import { useAxiosClient } from "../hooks/axios-hook";

const AccountDetailScreen = (props) => {
  const auth = useContext(AuthContext);
  const [accountDetail, setAccountDetail] = useState("LOADING");
  const { accountId, subAccount } = useParams();
  const { isLoading, error, sendRequest, clearError } = useAxiosClient();

  useEffect(() => {
    const fetchAccountDetail = async () => {
      try {
        const responseData = await sendRequest(
          "GET",
          `http://localhost:5000/api/plaid/accounts/${accountId}/${subAccount}`,
          {
            userId: auth.userId,
          },
          {
            "x-auth-token": auth.token,
          }
        );
        setAccountDetail(responseData);
      } catch (err) {}
    };
    fetchAccountDetail();
  }, [accountId, auth.token, auth.userId, sendRequest, subAccount]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="account-nav">
        <Button
          inverse
          className="account-nav__button"
          to={`/acc=${accountId}`}>
          RETURN
        </Button>
      </div>
      <Card className="account-card">
        <div className="account-card__header">
          {accountDetail.balanceResponse?.accounts[0].name || "LOADING"}
        </div>
        <div className="account-card__content">
          {accountDetail.balanceResponse && (
            <DetailList accountDetail={accountDetail} />
          )}
        </div>
      </Card>
    </React.Fragment>
  );
};

export default AccountDetailScreen;

const DetailList = (props) => {
  return (
    <React.Fragment>
      <div className="account-details__content">
        <div className="account-details__balance">
          $
          <div className="account-details__balance-large">
            {props.accountDetail.balanceResponse.accounts[0].balances.current ||
              0}
          </div>
          (of{"  "}
          {props.accountDetail.balanceResponse.accounts[0].balances.available +
            props.accountDetail.balanceResponse.accounts[0].balances.current ||
            0}
          )
        </div>
      </div>
    </React.Fragment>
  );
};
