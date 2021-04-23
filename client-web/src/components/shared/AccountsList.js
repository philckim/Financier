import React from "react";
import { Link } from "react-router-dom";
import "../css/accountslist.css";

const AccountsList = (props) => {
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
            to={`/acc=${account.id || props.accountId}`}>
            <div className="accountslist-card-title">
              {account.institutionName || account.name}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default AccountsList;
