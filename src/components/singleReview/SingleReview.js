import React from "react";
import "./singleReview.css";
import StarRatings from "react-star-ratings";

const SingleReview = ({ reviewDetails }) => {
  const { name, text, review } = reviewDetails;
  return (
    <div className="single-review py-3">
      <h4 className="my-3">
        {" "}
        <span>
          {" "}
          <i className="far fa-user nav-logo me-1"></i>{" "}
        </span>{" "}
        {name}{" "}
      </h4>
      <h6 className="my-3"> {text} </h6>
      <StarRatings
        rating={review}
        starRatedColor="red"
        starDimension="15px"
        starSpacing="2px"
      />
    </div>
  );
};

export default SingleReview;
