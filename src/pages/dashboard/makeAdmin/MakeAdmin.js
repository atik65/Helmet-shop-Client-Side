import React, { useState } from "react";
import "./makeAdmin.css";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const MakeAdmin = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdmin = (e) => {
    e.preventDefault();

    setLoading(true);
    axios
      .put(`https://helmetshop.onrender.com/${email}/users/admin`)
      .then((res) => {
        setLoading(false);
        setEmail("");
        Swal.fire({
          icon: "success",
          title: "Promoted to Admin successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        if (error.message == "Request failed with status code 401") {
          Swal.fire({
            icon: "error",
            title: "User doesn't exist! ",
          });
        }

        setLoading(false);
      });
  };

  return (
    <div className="make-admin">
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-grow text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          {" "}
          <h2 className="text-center my-5"> Promote to Admin </h2>
          <form onSubmit={(e) => handleAdmin(e)} action="">
            <input
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />

            <button type="submit"> Make Admin </button>
          </form>{" "}
        </div>
      )}
    </div>
  );
};

export default MakeAdmin;
