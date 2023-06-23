import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "./reviews.css";
import axios from "axios";
import SingleReview from "../../../components/singleReview/SingleReview";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    axios
      .get("https://helmetshop.onrender.com/reviews")
      .then((res) => setReviews(res.data))
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };
  return (
    <div className="myslider">
      <div className="container ">
        <h3 className="text-center my-3 my-md-5">Our Customers Reviews</h3>

        <Slider {...settings}>
          {reviews.map((review) => {
            return <SingleReview key={review._id} reviewDetails={review} />;
          })}
        </Slider>
      </div>
    </div>
  );
};

export default Reviews;
