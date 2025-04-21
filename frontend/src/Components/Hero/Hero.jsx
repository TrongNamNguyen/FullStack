import React from "react";
import "./Hero.css";
import banner from "../Assets/banner.png";
const Hero = () => {
  return (
    <div className="banner">
        <img src={banner} alt="banner" />
    </div>
  );
};

export default Hero;
