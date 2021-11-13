import "./addProduct.css";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
// import useAuth from "../../hooks/useAuth";

const AddProduct = () => {
  const {
    reset,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    data.rating = parseFloat(data.rating);
    data.price = parseFloat(data.price);

    setLoading(true);
    axios
      .post("https://radiant-beach-55778.herokuapp.com/helmets", data)
      .then((res) => {
        setLoading(false);
        reset();
        Swal.fire({
          icon: "success",
          title: "You Order Placed successfully!",
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
        <div className="buynow place-order container py-3">
          <h2 className="text-center pb-4"> Add New Helmet </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="text-center">
            <input
              className="form-control my-2"
              type="text"
              placeholder="Helmet Name"
              {...register("name", { required: true })}
            />

            <input
              className="form-control my-2"
              type="number"
              placeholder="Price"
              {...register("price", {
                required: true,
              })}
            />

            <input
              className="form-control my-2"
              type="text"
              placeholder="Image Url "
              {...register("image", {
                required: true,
              })}
            />
            <input
              className="form-control my-2"
              type="text"
              placeholder="Type of Helmet (As many as Possible)"
              {...register("type", {
                required: true,
              })}
            />

            <input
              className="form-control my-2"
              type="text"
              placeholder="Certification"
              {...register("certification", {
                required: true,
              })}
            />

            <input
              className="form-control my-2"
              type="number"
              placeholder="Rating ( Must be between 1-5 )"
              {...register("rating", {
                required: true,
                max: 5,
                min: 1,
              })}
            />

            <input
              className="form-control my-2"
              style={{ height: "80px" }}
              type="text"
              placeholder="Description"
              {...register("description", {
                required: true,
              })}
            />

            <button className="email-login my-2" type="submit">
              Add Helmet
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
