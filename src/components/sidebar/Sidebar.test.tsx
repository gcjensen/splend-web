import React from "react";
import { render, screen } from "@testing-library/react";

import { User } from "../../lib/api/user";
import UserContext from "../../lib/context/user-context";
import Sidebar from "./Sidebar";

test("renders the user details from the context", () => {
  const user = {
    email: "moff@gideon.com",
    firstName: "Moff",
    lastName: "Gideon",
  };

  render(
    <UserContext.Provider value={user as User}>
      <Sidebar />
    </UserContext.Provider>
  );

  expect(screen.getByText(user.email)).toBeInTheDocument();
  expect(screen.getByText(/Moff G./i)).toBeInTheDocument();
});

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
