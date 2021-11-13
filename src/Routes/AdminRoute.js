import React from "react";
import { Redirect, Route } from "react-router";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children, ...rest }) => {
  const { user, loading, admin, adminLoading } = useAuth();

  if (!admin) {
    return (
      <h1 className="text-center mt-5">
        {adminLoading && !admin ? "You are Not an Admin" : "Loading..."}
      </h1>
    );
  }

  if (loading) {
    // return <h1 className="text-center mt-5">Loading... </h1>;

    return (
      <div className="text-center py-5">
        <div className="spinner-grow text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user?.email && admin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
export default AdminRoute;
