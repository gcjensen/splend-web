const testData = [
  {
    amount: "10000",
    category: "Bills",
    description: "Parking Permit",
    id: 13,
    owed: "5000",
    settled: "2018-10-30T16:40:41Z",
    spender: "1",
    timestamp: "2018-09-05T21:25:14Z",
  },
  {
    amount: "3329",
    category: "Bills",
    description: "Water Bill",
    id: 12,
    owed: "1664",
    settled: "2018-10-01T22:45:31Z",
    spender: "1",
    timestamp: "2018-09-03T21:24:53Z",
  },
  {
    amount: "6600",
    category: "Groceries",
    description: "Aldi",
    id: 11,
    owed: "3300",
    settled: "2018-10-01T22:45:31Z",
    spender: "1",
    timestamp: "2018-09-03T21:24:13Z",
  },
];

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

export async function getTransactions() {
  const transactions = await Promise.resolve(testData);

  return groupTransactionsByDate(transactions);
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
