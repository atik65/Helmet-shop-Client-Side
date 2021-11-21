import React, { useState, useEffect } from "react";
import "./paymnet.css";
import Navbar from "../shared/navbar/Navbar";
import Footer from "../shared/footer/Footer";
import stripe from "../../images/stripe.png";
import ssl from "../../images/ssl.png";
import { useParams, useHistory } from "react-router";
import axios from "axios";

const Paymnet = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://radiant-beach-55778.herokuapp.com/orders/${id}`)
      .then((res) => {
        setOrder(res.data);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, []);

  const handleStripe = () => {
    setLoading(true);
    axios
      .post("https://radiant-beach-55778.herokuapp.com/payment/stripe", order)
      .then((res) => {
        setLoading(false);
        window.location = res.data.url;
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  };

  // const handleSsl = () => {
  // setLoading(true);
  // axios
  //   .post("http://localhost:5000/sslcommerz", order)
  //   .then((res) => {
  //     setLoading(false);
  //     // window.location = res.data.url;
  //   })
  //   .catch((error) => {
  //     console.log(error.message);
  //     setLoading(false);
  //   });
  // };

  return (
    <div>
      <Navbar />
      <div style={{ minHeight: "50vh" }}>
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-grow text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="payment">
            <div className="mx-5 my-4 payment-inner" onClick={handleStripe}>
              <h3>Pay with Stripe </h3>
              <img src={stripe} alt="" />
            </div>
            {/* <div className="mx-5 my-4 payment-inner" onClick={handleSsl}>
              <h3>Pay with SSL Commerz</h3>
              <img src={ssl} alt="" />
            </div> */}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Paymnet;
