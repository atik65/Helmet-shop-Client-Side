import React from "react";
import "./singleHelmet.css";
// import StarRatings from "./react-star-ratings";
import StarRatings from "react-star-ratings";
import { NavLink } from "react-router-dom";

const SingleHelmet = ({ helmet }) => {
  const { _id, name, price, image, type, certification, rating } = helmet;

  return (
    <div data-aos="zoom-in-up" className="single-helmet">
      <img src={`data:image/png;base64, ${image}`} alt="" />

      <div className="single-helmet-des">
        <h4> {name} </h4>
        <h6>
          {" "}
          Type of Helmet: <span>{type}</span>
        </h6>
        <h6>
          {" "}
          Certification: <span>{certification}</span>{" "}
        </h6>
        <div className="single-helmet-price">
          <span> ${price} </span>
          <span>
            <StarRatings
              rating={rating}
              starRatedColor="red"
              starDimension="15px"
              starSpacing="2px"
            />
          </span>
        </div>
      </div>

      <div className="single-helmet-inner">
        <NavLink to={`buynow/${_id}`}> Buy Now </NavLink>
      </div>
    </div>
  );
};

export default SingleHelmet;
