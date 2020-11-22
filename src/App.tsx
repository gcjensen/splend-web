import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";

import Sidebar from "./components/sidebar/Sidebar";
import Transactions from "./pages/transactions/Transactions";
import UserContext from "./lib/context/user-context";
import { logIn, User } from "./lib/api/user";
import "./App.scss";

function App() {
  return (
    <Router>
      <AppWithUser>
        <Sidebar />
        <Switch>
          <Route path="/transactions">
            <Transactions />
          </Route>
        </Switch>
      </AppWithUser>
    </Router>
  );
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function AppWithUser(props: { children: React.ReactNode }) {
  const query = useQuery();
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    async function logInUser() {
      const email = query.get("email");
      const token = query.get("token");

      if (email && token) {
        const user = await logIn(email, token);
        setUser(user);
      }
    }

    logInUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <UserContext.Provider value={user}>
      <div className="App">{props.children}</div>;
    </UserContext.Provider>
  );
}

export default App;
