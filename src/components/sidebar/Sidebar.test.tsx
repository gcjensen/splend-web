import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import casual from "casual";

import { User, getSummary } from "../../lib/api/user";
import UserContext from "../../lib/context/user-context";
import Sidebar from "./Sidebar";

jest.mock("../../lib/api/user");

const mockUser = {
  email: casual.email,
  firstName: casual.first_name,
  id: casual.integer(),
  lastName: casual.last_name,
};

test("renders the user details and fetches their balance", async () => {
  const summary = { balance: 5420 };
  (getSummary as jest.Mock).mockResolvedValueOnce(summary);

  render(
    <UserContext.Provider value={mockUser as User}>
      <Sidebar />
    </UserContext.Provider>
  );

  expect(screen.getByText(mockUser.email)).toBeInTheDocument();

  expect(getSummary).toHaveBeenCalledTimes(1);

  await waitFor(() => screen.getByText(/£54.20/));
});

test("render a transactions nav link", () => {
  render(<Sidebar />);
  const transactionsLink = screen.getByText(/transactions/i);
  expect(transactionsLink).toBeInTheDocument();
});
