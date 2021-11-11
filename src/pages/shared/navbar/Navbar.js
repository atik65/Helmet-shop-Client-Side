import React from "react";
import "./navbar.css";
import logo from "../../../images/helmet-logo.png";
import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
const Navbar = () => {
  const { user, logOut } = useAuth();

  return (
    <div className="container">
      <div className="navbar-parent">
        <nav className="navbar navbar-expand-lg navbar-light bg-none">
          <div className="container-fluid">
            <NavLink className="navbar-brand " to="/">
              <div className="navbar-logo">
                <img src={logo} alt="" width="auto" height="40" /> Helmet
                <span>Mania</span>
              </div>
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarNav">
              <ul className="navbar-nav ms-auto nav-lists">
                <li className="nav-item me-md-4 me-0">
                  <NavLink className="nav-link " to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item me-md-4 me-0">
                  <NavLink className="nav-link" to="/explore">
                    Explore
                  </NavLink>
                </li>

                {user?.email && (
                  <li className="nav-item me-md-4 me-0">
                    <NavLink className="nav-link" to="/dashboard">
                      Dashboard
                    </NavLink>
                  </li>
                )}
                {user?.email ? (
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      onClick={logOut}
                      style={{ cursor: "pointer" }}
                    >
                      {user.displayName} Log out
                    </a>
                  </li>
                ) : (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      <span>
                        <i className="far fa-user nav-logo me-1"></i>
                      </span>
                      Register or Login
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
