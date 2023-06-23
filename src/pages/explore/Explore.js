import React, { useState, useEffect } from "react";
import Footer from "../shared/footer/Footer";
import Navbar from "../shared/navbar/Navbar";
import "./explore.css";
import axios from "axios";
import SingleHelmet from "../../components/singleHelmet/SingleHelmet";
import Loading from "../../components/shared/Loading";

const Explore = () => {
  const [helmets, setHelmets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://helmetshop.onrender.com/helmets")
      .then((res) => {
        setHelmets(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="explore">
      <Navbar />

      <h1 className="text-center pt-5"> Our Collections </h1>

      {loading ? (
        <Loading />
      ) : (
        <div className="display-products-container  container pb-5">
          {helmets.map((helmet) => {
            return <SingleHelmet key={helmet._id} helmet={helmet} />;
          })}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Explore;
