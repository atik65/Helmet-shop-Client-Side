import React from "react";
import "./slider.css";
import slideOne from "../../../images/slider/slider-1.jpg";
import slideTwo from "../../../images/slider/slider-2.jpg";
import slideThree from "../../../images/slider/slider-3.jpg";
import { NavLink } from "react-router-dom";

const Banner = () => {
  return (
    <div className="slider">
      <div
        id="carouselExampleCaptions"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={slideOne} className="d-block w-100" alt="..." />
            <div className=" d-none d-md-block carousel-text">
              <div className="carousel-text-inner">
                <h1>
                  Driving a <br />
                  motorcycle is like <br />
                  flying
                </h1>
                {/* <h2>7 Days, 8 Night Tour</h2> */}
                <NavLink className="tour-explore" to="/explore">
                  Explore Helmets
                </NavLink>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img src={slideTwo} className="d-block w-100" alt="..." />
            <div className="caption d-none d-md-block carousel-text">
              <div className="carousel-text-inner">
                <h1>
                  Driving a <br />
                  motorcycle is like <br />
                  flying
                </h1>

                <NavLink className="tour-explore" to="/explore">
                  <span> Explore Helmets</span>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img src={slideThree} className="d-block w-100" alt="..." />
            <div className="d-none d-md-block carousel-text">
              <div className="carousel-text-inner">
                <h1>
                  Driving a <br />
                  motorcycle is like <br />
                  flying
                </h1>
                {/* <h2>7 Days, 8 Night Tour</h2> */}
                <NavLink className="tour-explore" to="/explore">
                  <span> Explore Helmets</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Banner;
