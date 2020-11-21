import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { BiTransfer } from "react-icons/bi";

import "../../styles/Base.scss";
import "./Sidebar.scss";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="section profile">
        <img
          alt="User"
          className="user-image"
          src="https://pbs.twimg.com/profile_images/1103056988555096065/kWAs7suL_400x400.jpg"
        ></img>
        <h4>George J.</h4>
      </div>

      <div className="section">
        <label className="grey-label">Balance</label>
        <h2 className="balance">£143.32</h2>
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
