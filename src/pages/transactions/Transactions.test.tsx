import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import casual from "casual";

import {
  getTransactions,
  GroupedTransactions,
} from "../../lib/api/transactions";
import { User } from "../../lib/api/user";
import UserContext from "../../lib/context/user-context";
import Transactions from "./Transactions";

jest.mock("../../lib/api/transactions");

test("renders a page title", async () => {
  render(<Transactions />);

  const title = screen.getByText(/transactions/i);
  expect(title).toBeInTheDocument();
});

test("renders the list of transactions grouped by date", async () => {
  const transactions: GroupedTransactions = {
    date: "2020-11-24",
    transactions: [],
  };

  for (var i = 0; i < 2; i++) {
    transactions.transactions.push({
      amount: `${casual.integer()}`,
      category: casual.word,
      description: casual.word,
      id: casual.integer(),
      owed: `${casual.integer()}`,
      settled: "2020-11-24T16:40:41Z",
      spender: `${casual.integer}`,
      timestamp: "2020-11-24T15:40:41Z",
    });
  }

  (getTransactions as jest.Mock).mockResolvedValueOnce([transactions]);

  render(
    <UserContext.Provider value={{ id: 1 } as User}>
      <Transactions />
    </UserContext.Provider>
  );

  const title = screen.getByText(/transactions/i);
  expect(title).toBeInTheDocument();

  expect(getTransactions).toHaveBeenCalled();

  await waitFor(() => screen.getByText("24 Nov 2020"));

  transactions.transactions.forEach((t) => {
    expect(screen.getByText(t.description)).toBeInTheDocument();
    expect(screen.getByText(t.category)).toBeInTheDocument();
  });
});
