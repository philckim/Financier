import React from "react";
import { Link, useParams } from "react-router-dom";
import "../css/accountslist.css";

const AccountsList = (props) => {
  const { accountId } = useParams();
  if (!props.accounts.length) {
    return <div>Error</div>;
  }

  return (
    <div className="accountslist-holder">
      {props.accounts.map((account) => {
        return (
          <Link
            className={`accountslist-card accountslist-card--${
              props.size || "default"
            } ${props.dark && "accountslist-card--dark"}`}
            key={account.id || account.account_id}
            to={
              account.name
                ? `/acc=${accountId}/sub=${account.account_id}`
                : `/acc=${account.id}`
            }>
            <div className="accountslist-card-container">
              <div className="accountslist-card-header" />
              <div className="accountslist-card-title">
                {account.institutionName || account.name}
              </div>
              <div className="accountslist-card-details">
                {account.name && `(${account.subtype})`}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default AccountsList;
