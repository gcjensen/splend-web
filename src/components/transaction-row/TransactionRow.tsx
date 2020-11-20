import React from "react";

import { Transaction } from "../../lib/api/transactions";
import "./TransactionRow.scss";

interface Props {
  transaction: Transaction;
}

function TransactionRow(props: Props) {
  return (
    <div className="transaction-row">
      <div className="des-and-time">
        <h4>{props.transaction.description}</h4>
        <span className="grey-text">{props.transaction.timestamp}</span>
      </div>
      <div className="category">{props.transaction.category}</div>
      <div className="amount">
        <span>£{parseInt(props.transaction.owed, 10) / 100}</span>
        <span>£{parseInt(props.transaction.amount, 10) / 100}</span>
      </div>
    </div>
  );
}

export default TransactionRow;
