import React from "react";

import Card from "./Card";
import "../css/transaction.css";

const TransactionList = (props) => {
  if (!props.transactions.length) {
    return (
      <div className="transaction-list center">
        <Card className="transaction-item">
          <h2>No transactions found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="transaction-list">
      {props.transactions.map((transaction) => (
        <li key={transaction.transaction_id}>
          <Card className="transaction-item">
            <h2>{transaction.name}</h2>
            <h3>${transaction.amount}</h3>
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
