import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        {/* Left Section */}
        <div className="footer-content-left">
          <img src={assets.logo} alt="NomNom Logo" className="footer-logo" />
          <p className="footer-description">
            🍕Delivering happiness one bite at a time! <br />
            Your favorite dishes are just a click away.
          </p>
          <div className="footer-social-icons">
            <a href="#" aria-label="Facebook"><img src={assets.facebook_icon} alt="Facebook" /></a>
            <a href="#" aria-label="Twitter"><img src={assets.twitter_icon} alt="Twitter" /></a>
            <a href="#" aria-label="Instagram"><img src={assets.linkedin_icon} alt="Instagram" /></a>
          </div>
        </div>

        {/* Center Sections */}
        <div className="footer-sections-container">
          <div className="footer-section">
            <h3 className="footer-heading">NomNom</h3>
            <ul className="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Chefs</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Help</h3>
            <ul className="footer-links">
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">Track Order</a></li>
              <li><a href="#">Returns</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Contact</h3>
            <ul className="footer-links">
              <li><a href="mailto:hello@nomnom.com">hello@nomnom.com</a></li>
              <li><a href="tel:+18779567899">(877) 956-7899</a></li>
           
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} NomNom. All rights reserved.</p>
        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;