import React from "react";
import { parseISO, format } from "date-fns";

import { Transaction } from "../../lib/api/transactions";
import "./TransactionRow.scss";

interface Props {
  transaction: Transaction;
}

function formatAmount(amount: string): string {
  return (parseInt(amount, 10) / 100).toFixed(2);
}

function formatDate(timestamp: string): string {
  const date = format(parseISO(timestamp), "d MMM u");
  const time = format(parseISO(timestamp), "k:m");

  return `${date} at ${time}`;
}

function styleAmount(amount: string) {
  const pounds = Math.floor(parseInt(amount) / 100);
  const pence = (parseInt(amount, 10) / 100).toFixed(2).slice(-2);

  return (
    <div className="styled-amount">
      <span className="pounds">{pounds}</span>.
      <span className="pence">{pence}</span>
    </div>
  );
}

function styleCategory(category: string) {
  return (
    <div className={`label ${category.toLowerCase()}`}>
      {/* <span className={`dot ${category}`}></span> */}
      <span>{category}</span>
    </div>
  );
}

function TransactionRow(props: Props) {
  return (
    <div className="transaction-row">
      <div className="des-and-time">
        <h4>{props.transaction.description}</h4>
        <span className="grey-label">
          {formatDate(props.transaction.timestamp)}
        </span>
      </div>
      <div className="category">
        {styleCategory(props.transaction.category)}
      </div>
      <div className="amounts">
        {styleAmount(props.transaction.owed)}
        <span className="total-amount">
          {`£${formatAmount(props.transaction.amount)}`}
        </span>
      </div>
    </div>
  );
}

export default TransactionRow;
