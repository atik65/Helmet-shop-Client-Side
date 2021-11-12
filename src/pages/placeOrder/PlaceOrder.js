import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import "./placeOrder.css";
import Footer from "../shared/footer/Footer";
import Navbar from "../shared/navbar/Navbar";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const PlaceOrder = () => {
  const {
    reset,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();

  const { id } = useParams();

  const history = useHistory();

  const [helmet, setHelmet] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://radiant-beach-55778.herokuapp.com/helmets/${id}`)
      .then((res) => {
        setHelmet(res.data);
        setLoading(false);
        setValue("name", user?.displayName);
        setValue("email", user.email);
        setValue("product", res.data.name);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, []);

  const onSubmit = (data) => {
    axios
      .post("https://radiant-beach-55778.herokuapp.com/orders", data)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "You Order Placed successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/explore");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const { _id, name, price, image, type, certification, rating, description } =
    helmet;

  return (
    <div style={{ backgroundColor: "white" }}>
      <Navbar />

      <div className="buy-now-inner">
        {loading ? (
          <div className="text-center py-5">
            <div class="spinner-grow text-danger" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="buynow place-order container py-5">
            <h2 className="text-center pb-4">
              {" "}
              Checkout Your Shipping Details{" "}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="text-center">
              <input
                className="form-control my-2"
                type="text"
                placeholder="Name"
                {...register("name", { required: true })}
              />

              <input
                className="form-control my-2"
                type="text"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />

              <input
                className="form-control my-2"
                type="text"
                placeholder="Product"
                value={name}
                {...register("product", { required: true })}
              />

              <input
                className="form-control my-2"
                type="text"
                placeholder="Address"
                {...register("address", { required: true })}
              />

              <input
                className="form-control my-2"
                type="number"
                placeholder="Phone Number"
                {...register("phone")}
              />

              <button className="email-login my-2" type="submit">
                Place Order
              </button>
            </form>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default PlaceOrder;
