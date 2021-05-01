import React from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
                {account.name && <AccountIcon subtype={account.subtype} />}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default AccountsList;

const AccountIcon = (props) => {
  let icon;
  switch (props.subtype) {
    case "checking":
      icon = "money-check-alt";
      break;
    case "credit card":
      icon = "credit-card";
      break;
    case "mortgage":
      icon = "home";
      break;
    case "savings":
      icon = "piggy-bank";
      break;
    case "student":
      icon = "user-graduate";
      break;
    default:
      icon = "file-invoice-dollar";
      break;
  }

  return <FontAwesomeIcon size="2x" icon={icon} />;
};
