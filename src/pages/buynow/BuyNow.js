import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Footer from "../shared/footer/Footer";
import Navbar from "../shared/navbar/Navbar";
import StarRatings from "react-star-ratings";
import "./buyNow.css";
import { NavLink } from "react-router-dom";
import Loading from "../../components/shared/Loading";

const BuyNow = () => {
  const { id } = useParams();

  const [helmet, setHelmet] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://helmetshop.onrender.com/helmets/${id}`)
      .then((res) => {
        setHelmet(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, []);

  const { _id, name, price, image, type, certification, rating, description } =
    helmet;
  return (
    <div style={{ backgroundColor: "white" }}>
      <Navbar />

      <div className="buy-now-inner">
        {loading ? (
          <Loading />
        ) : (
          <div className="buynow container py-5">
            <div className="row px-0 mx-0">
              <div className="col-md-6">
                <img src={`data:image/png;base64, ${image}`} alt="" />
              </div>
              <div className="col-md-6 ps-4">
                <h4> Name: {name} </h4>
                <h5> Type of Helmet: {type} </h5>
                <h5> Certification: {certification} </h5>
                <h5> Price: ${price} </h5>

                <div className="pt-0 pb-4">
                  <StarRatings
                    rating={rating}
                    starRatedColor="red"
                    starDimension="15px"
                    starSpacing="2px"
                  />
                </div>

                <p className="mb-4"> {description} </p>

                <NavLink to={`/placeorder/${_id}`}>Checkout</NavLink>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BuyNow;
