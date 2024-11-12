import React from "react";
import { Link } from "react-router-dom";
import LogoImage from "../Assets/Logo.svg";
import SalaryIcon from "../Assets/salarybenchmark.png";
import NegotiationIcon from "../Assets/negotiation.png";
import ConfidenceIcon from "../Assets/boost.png";

const ChatSuggestions = () => {
  return (
    <div className="input-form-container">
      <div className="input-form">
        <div className="logo">
        </div>

        <h2 className="input-form-title">Let's chat about</h2>

        {/* Button Suggestions */}
        <div className="suggestions-buttons">
          {/* Use Link component to navigate */}
          <Link to="/chatbot/salary">
            <button className="suggestion-button">
              <img src={SalaryIcon} alt="Salary Icon" className="icon" />
              Salary Benchmark
            </button>
          </Link>

          <Link to = "/chatbot/negotiation">
          <button className="suggestion-button">
            <img src={NegotiationIcon} alt="Negotiation Icon" className="icon" />
            Negotiation Salary
          </button>
          </Link>
          
        <Link to = "/chatbot/boost-confidence">
        <button className="suggestion-button">
            <img src={ConfidenceIcon} alt="Confidence Icon" className="icon" />
            Boosting Your Confidence
          </button>
        </Link>
         


        </div>
      </div>
    </div>
  );
};

export default ChatSuggestions;
