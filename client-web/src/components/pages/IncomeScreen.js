import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../functions/auth-context";
import Card from "../shared/Card";
import ErrorModal from "../layout/ErrorModal";
import LoadingSpinner from "../layout/LoadingSpinner";
import { useAxiosClient } from "../hooks/axios-hook";

const IncomeScreen = (props) => {
  const auth = useContext(AuthContext);
  const [income, setIncome] = useState();
  const { isLoading, error, sendRequest, clearError } = useAxiosClient();

  useEffect(() => {
    if (!auth.token) return;
    const getIncome = async () => {
      try {
        const responseData = await sendRequest(
          "GET",
          "http://localhost:5000/api/income",
          {
            userId: auth.userId,
          },
          {
            "x-auth-token": auth.token,
          }
        );
        setIncome(responseData);
      } catch (err) {}
    };
    //getIncome();
  }, [auth.token, auth.userId, sendRequest]);

  let content;
  if (!income) {
    content = <h2>LOADING</h2>;
  } else {
    content = (
      <Card className="account-card">
        <div className="account-card-container">
          <div className="account-card-header"></div>
        </div>
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
