import React from "react";
import useAuth from "../../../hooks/useAuth";
import "./dashboard.css";
import img from "../../../images/dashboard.png";

const Dashboard = () => {
  const { user, admin, logOut } = useAuth();

  return (
    <div className="dashboard">
      <h1 className="text-center">User Profile</h1>
      <div className="row mx-0 px-0">
        <div className="col-md-6 ">
          <img src={img} alt="" />
        </div>
        <div className="col-md-6 pt-5">
          <h5>Name: {user.displayName}</h5>
          <h6>Email: {user.email}</h6>
          <h6> Role: {admin ? "Admin" : "Normal User"} </h6>
          <button onClick={logOut}> Log Out </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
