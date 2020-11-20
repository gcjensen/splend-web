import React from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Transactions from "./pages/transactions/Transactions";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Switch>
          <Route path="/transactions">
            <Transactions />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
