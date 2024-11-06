import React from "react";
import AboutBackground from "../Assets/about-background.png";
import AboutBackgroundImage from "../Assets/money1.png";
import { BsFillPlayCircleFill } from "react-icons/bs";

const About = () => {
  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" style={{ width: '80%', height: 'auto' }} /> {/* Adjusted size */}
      </div>
      <div className="about-section-text-container">
        <h1 className="primary-heading">What we Believe?</h1>
        <p className="primary-text">
          At Prospera, we believe everyone deserves fair pay. Our AI-powered assistant empowers you to:
        </p>
        <ul className="primary-text">
          <li>Negotiate confidently with data-driven insights.</li>
          <li>Promote equity in the workplace, ensuring fair treatment for all.</li>
          <li>Access transparent salary information to know your worth.</li>
        </ul>
        <div className="about-buttons-container">
          <button className="secondary-button-learn-more-button">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default About;
