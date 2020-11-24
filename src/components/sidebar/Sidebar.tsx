import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { BiTransfer } from "react-icons/bi";

import UserContext from "../../lib/context/user-context";
import { getSummary, Summary } from "../../lib/api/user";
import "../../styles/Base.scss";
import "./Sidebar.scss";

function Sidebar() {
  const user = useContext(UserContext);
  const [summary, setSummary] = useState<Summary>({} as Summary);

  useEffect(() => {
    async function loadSummary() {
      const summary = await getSummary(user.id, user.token || "");
      setSummary(summary);
    }

    if (user.id) {
      loadSummary();
    }
  }, [user]);

  return (
    <div className="sidebar">
      <div className="section profile">
        <img alt="User" className="user-image" src={user.iconLink}></img>
        {user.firstName && user.lastName && user.email && (
          <div>
            <h4>{`${user.firstName} ${user.lastName.slice(0, 1)}.`}</h4>
            <label className="grey-label">{user.email}</label>
          </div>
        )}
      </div>

      <div className="section">
        <label className="grey-label">Balance</label>
        {summary && summary.balance && (
          <h2 className="balance">£{(summary.balance / 100).toFixed(2)}</h2>
        )}
      </div>

      <ul className="nav">
        <li>
          <Router>
            <Link className="link" to="/transactions">
              <div>
                <BiTransfer />
                <span>Transactions</span>
              </div>
            </Link>
          </Router>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
