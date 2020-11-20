import React, { useEffect, useState } from "react";

import TransactionRow from "../../components/transaction-row/TransactionRow";
import {
  getTransactions,
  GroupedTransactions,
} from "../../lib/api/transactions";
import "./Transactions.scss";

function Transactions() {
  const [transactions, setTransactions] = useState<GroupedTransactions[]>([]);

  const loadTransactions = async () => {
    const txs = await getTransactions();
    setTransactions(txs);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <div>
      <h2>Transactions</h2>
      {transactions ? (
        <ul>
          {transactions.map((grouped) => {
            return (
              <li className="group-section" key={grouped.date.toString()}>
                <h5 className="heading">{grouped.date}</h5>
                {grouped.transactions.map((t) => (
                  <TransactionRow key={t.id.toString()} transaction={t} />
                ))}
              </li>
            );
          })}
        </ul>
      ) : (
        <h5>No transactions available</h5>
      )}
    </div>
  );
}

export default Transactions;