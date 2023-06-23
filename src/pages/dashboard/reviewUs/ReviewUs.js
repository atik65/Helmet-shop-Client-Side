import "./reviewUs.css";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

import Swal from "sweetalert2";
// import useAuth from "../../hooks/useAuth";

const ReviewUs = () => {
  const { user } = useAuth();
  const {
    reset,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    data.review = parseFloat(data.review);

    setLoading(true);
    axios
      .post("https://helmetshop.onrender.com/reviews", data)
      .then((res) => {
        setLoading(false);
        reset();
        Swal.fire({
          icon: "success",
          title: "Thanks for Your Review!",
          showConfirmButton: false,
          timer: 1500,
        });
        // history.push("/explore");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
      });
  };

  return (
    <div>
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-grow text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="buynow place-order container py-4">
          <h2 className="text-center pb-4"> Review Us </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="text-center">
            <input
              className="form-control my-2"
              type="text"
              placeholder=" Name"
              value={user.displayName}
              {...register("name", { required: true })}
            />

            <input
              className="form-control my-2"
              type="text"
              placeholder="Rating ( Must be between 1-5 )"
              {...register("review", {
                required: true,
                max: 5,
                min: 1,
              })}
            />

            <input
              className="form-control my-2"
              style={{ height: "100px" }}
              type="text"
              placeholder="Write Your Review About us"
              {...register("text", {
                required: true,
              })}
            />

            <button className="email-login my-2" type="submit">
              Review
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ReviewUs;
