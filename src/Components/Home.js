import React from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import horseImage from "../Assets/horseRide.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
          Book Your Adventure Today
          </h1>
          <p className="primary-text">
          Whether you're a beginner or an experienced rider, we have the perfect ride for you. Start your journey with us today.
          </p>
          <button className="secondary-button" onClick={() => window.location.href="#booking"}>
            Book Now <FiArrowRight />{" "}
          </button>
        </div>
        <div className="home-image-section">
          <img src={horseImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
