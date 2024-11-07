import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import Banner1 from "../Assets/women1.png";
import Banner2 from "../Assets/women2.png";
import Banner3 from "../Assets/women3.png";
import Banner4 from "../Assets/women4.png";
import Banner5 from "../Assets/women5.png";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [Banner5, Banner2, Banner3, Banner4, Banner1];

  const navigate = useNavigate(); // Initialize navigate hook

  // Automatically switch images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Function to handle button click
  const handleLetsGoClick = () => {
    navigate("/input-form"); // Navigate to the chatbot page
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        {/* Image slider section */}
        <div className="home-slider-container">
          <img src={images[currentImage]} alt="Slider" className="slider-image" />
          <div className="overlay-text">
            <h1 className="primary-heading">Empowering you to earn <br />what you deserve.</h1>
            <button className="lets-go-button" onClick={handleLetsGoClick}> {/* Attach the click handler */}
              Let's Go!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
