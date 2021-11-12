import React from "react";
import "./error.css";
import notFound from "../../images/notFound.png";
import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <div className="notFound">
      <img src={notFound} alt="" /> <br />
      <NavLink to="/"> Go Back to Website </NavLink>
    </div>
  );
};

export default Error;
