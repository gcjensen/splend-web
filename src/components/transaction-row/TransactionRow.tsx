import React from "react";
import { parseISO, format } from "date-fns";

import { Transaction } from "../../lib/api/transactions";
import "./TransactionRow.scss";

interface Props {
  transaction: Transaction;
}

function formatDate(timestamp: string): string {
  const date = format(parseISO(timestamp), "d MMM u");
  const time = format(parseISO(timestamp), "k:m");

  return `${date} at ${time}`;
}

function styleAmount(amount: number) {
  const pounds = Math.floor(amount / 100);
  const pence = (amount / 100).toFixed(2).slice(-2);

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
  const { transaction } = props;
  const userAmount = parseInt(transaction.amount) - parseInt(transaction.owed);
  const amount = parseInt(transaction.amount);

  return (
    <div className="transaction-row">
      <div className="des-and-time">
        <h4>{transaction.description}</h4>
        <span className="grey-label">{formatDate(transaction.timestamp)}</span>
      </div>
      <div className="category">{styleCategory(transaction.category)}</div>
      <div className="amounts">
        {styleAmount(userAmount)}
        {amount !== userAmount && (
          <span className="total-amount">
            {`£${(amount / 100).toFixed(2)}`}
          </span>
        )}
      </div>
    </div>
  );
}

export default TransactionRow;
