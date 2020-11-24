import React, { useContext, useEffect, useState } from "react";
import { parseISO, format } from "date-fns";

import UserContext from "../../lib/context/user-context";
import TransactionRow from "../../components/transaction-row/TransactionRow";
import {
  getTransactions,
  GroupedTransactions,
} from "../../lib/api/transactions";
import "./Transactions.scss";

function Transactions() {
  const user = useContext(UserContext);
  const [transactions, setTransactions] = useState<GroupedTransactions[]>([]);

  useEffect(() => {
    const loadTransactions = async () => {
      const txs = await getTransactions(user.id, user.token || "");
      setTransactions(txs);
    };

    if (user.id) {
      loadTransactions();
    }
  }, [user.id, user.token]);

  return (
    <div>
      <h2>Transactions</h2>
      {transactions ? (
        <ul>
          {transactions.map((grouped) => {
            const date = format(parseISO(grouped.date), "d MMM u");

            return (
              <li className="group-section" key={grouped.date.toString()}>
                <h5 className="grey-label">{date}</h5>
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
