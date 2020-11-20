import React from "react";
import { render, screen } from "@testing-library/react";
import TransactionRow from "./TransactionRow";

test("renders the description, date, category and amounts", () => {
  const tx = {
    amount: "3200",
    category: "Bills",
    description: "Gas",
    id: 1,
    owed: "1600",
    settled: "2018-10-30T16:40:41Z",
    spender: "1",
    timestamp: "2018-09-05T21:25:14Z",
  };

  render(<TransactionRow transaction={tx} />);

  expect(screen.getByText(tx.description)).toBeInTheDocument();
  expect(screen.getByText(/5 Sep 2018/i)).toBeInTheDocument();
  expect(screen.getByText(tx.category)).toBeInTheDocument();

  // The owed amount is split across two spans for styling
  expect(screen.getByText("16")).toBeInTheDocument();
  expect(screen.getByText("00")).toBeInTheDocument();

  expect(screen.getByText("£32.00")).toBeInTheDocument();
});
