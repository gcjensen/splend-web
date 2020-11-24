import { API_URL } from "../constants/api";

const numTransactionsToShow = 20;

export interface Transaction {
  amount: string;
  category: string;
  description: string;
  id: number;
  owed: string;
  settled: string;
  spender: string;
  timestamp: string;
}

export interface GroupedTransactions {
  date: string;
  transactions: Transaction[];
}

export async function getTransactions(
  userID: number,
  token: string
): Promise<GroupedTransactions[]> {
  const response = await fetch(`${API_URL}/user/${userID}/outgoings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Token: token,
    },
  });

  const transactions = await response.json();

  return groupTransactionsByDate(transactions.slice(0, numTransactionsToShow));
}

function groupTransactionsByDate(txs: Transaction[]): GroupedTransactions[] {
  let grouped: { [date: string]: GroupedTransactions } = {};

  txs.forEach((tx) => {
    const date = tx.timestamp.slice(0, 10);
    if (grouped[date]) {
      grouped[date].transactions.push(tx);
      return;
    }

    grouped[date] = {
      date,
      transactions: [tx],
    };
  });

  return Object.values(grouped);
}
