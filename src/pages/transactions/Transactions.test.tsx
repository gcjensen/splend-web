import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Transactions from "./Transactions";
import { getTransactions } from "../../lib/api/transactions";

jest.mock("../../lib/api/transactions");

test("renders a page title", async () => {
  render(<Transactions />);
  const title = screen.getByText(/transactions/i);
  expect(title).toBeInTheDocument();

  await waitFor(() => expect(getTransactions).toHaveBeenCalled());
});
