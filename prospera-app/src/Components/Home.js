import React, { useState, useEffect } from "react";
import Contact from "./Contact"; 
import Work from "./Work";       
import About from "./About";
import Banner1 from "../Assets/women1.png";
import Banner2 from "../Assets/women2.png";
import Banner3 from "../Assets/women3.png";
import Banner4 from "../Assets/women4.png";
import Banner5 from "../Assets/women5.png";
import { useNavigate } from "react-router-dom"; 
const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [ Banner2, Banner3, Banner4, Banner1];

  const navigate = useNavigate(); 
  
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
    
      {/* Banner Section */}
      <div className="home-banner-container">
        <div className="home-slider-container">
          <img src={images[currentImage]} alt="Slider" className="slider-image" />
          <div className="overlay-text">
            <h1 className="primary-heading">
              Empowering you to earn <br /> what you deserve.
            </h1>
            <button className="lets-go-button" onClick={handleLetsGoClick}>
              Let's Go!
            </button>
          </div>
        </div>
      </div>
      {/*About section */}
      
      {/* Work Section */}
      <Work />  {/* Add the Work section here */}

      {/* Contact Section */}
      <Contact />  {/* Add the Contact section here */}

    </div>
    
  );
};

export default Home;

