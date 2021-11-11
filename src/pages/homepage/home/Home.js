import React from "react";
import Footer from "../../shared/footer/Footer";
import Navbar from "../../shared/navbar/Navbar";
import Contacts from "../contacts/Contacts";
import DisplayProducts from "../displayProducts/DisplayProducts";
import Reviews from "../reviews/Reviews";
import Banner from "../slider/Banner";
import "./home.css";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Banner />
      <DisplayProducts />
      <Reviews />
      <Contacts />
      <Footer />
    </div>
  );
};

export default Home;
