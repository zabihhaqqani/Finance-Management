import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const getActiveStyle = ({ isActive }) =>
    isActive ? "isActive" : "notActive";

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav>
      <h3>Finance App</h3>
      <div className="menu-icon" onClick={toggleMenu}>
        <i className={`fa-solid fa-${isOpen ? "x" : "bars"} fa-lg`}></i>
      </div>

      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li>
          <NavLink to="/" className={getActiveStyle}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/income-management" className={getActiveStyle}>
            Income
          </NavLink>
        </li>
        <li>
          <NavLink to="/expenses-management" className={getActiveStyle}>
            Expenses
          </NavLink>
        </li>
        <li>
          <NavLink to="/savings-management" className={getActiveStyle}>
            Savings
          </NavLink>
        </li>
        <li>
          <NavLink to="/reports" className={getActiveStyle}>
            Reports
          </NavLink>
        </li>
        <li>
          <NavLink
            to="https://github.com/zabihhaqqani/Finance-Management"
            className={getActiveStyle}
          >
            Github
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
