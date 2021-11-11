import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SingleHelmet from "../../../components/singleHelmet/SingleHelmet";

import "./displayProducts.css";

const DisplayProducts = () => {
  const [helmets, setHelmtes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://radiant-beach-55778.herokuapp.com/helmets")
      .then((res) => {
        setHelmtes(res.data.slice(0, 6));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="display-products">
      <div className="container">
        <div className="display-products-header">
          <div>
            <h3>Featured Items </h3>
          </div>
          <div>
            <NavLink to="/explore">View All</NavLink>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div class="spinner-grow text-danger" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="display-products-container">
            {helmets.map((helmet) => {
              return <SingleHelmet key={helmet._id} helmet={helmet} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayProducts;
