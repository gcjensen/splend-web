import React from "react";
import { render, screen } from "@testing-library/react";
import Sidebar from "./Sidebar";

test("renders the user's balance", () => {
  render(<Sidebar />);
  const balance = screen.getByText(/balance/i);
  expect(balance).toBeInTheDocument();
});

test("render a transactions nav link", () => {
  render(<Sidebar />);
  const transactionsLink = screen.getByText(/transactions/i);
  expect(transactionsLink).toBeInTheDocument();
});
