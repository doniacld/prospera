import React from "react";
import Logo from "../Assets/Logo.svg";
import { BsTwitter, BsInstagram } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-content">
        <div className="footer-logo-container">
          <img src={Logo} alt="Prospera Logo" className="footer-logo" />
        </div>
        <div className="footer-description">
          <p>
            Prospera is your AI-powered equal pay negotiation assistant, dedicated to helping you achieve fair compensation.
          </p>
        </div>
        <div className="footer-info">
          <span>Follow Us:</span>
          <div className="footer-icons">
            <BsTwitter />
            <SiLinkedin />
            <BsInstagram />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Prospera. All rights reserved.</span>
        <div className="footer-links">
          <span>Terms of Service</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
