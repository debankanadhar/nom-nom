import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        {/* Left Section */}
        <div className="footer-content-left">
          <img alt="Logo" src={assets.logo} />
          <p>
            Experience delicious meals delivered to your doorstep. Your favorite
            dishes are just a click away!
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>

        {/* Center Section - Company */}
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section - Help & Support */}
        <div className="footer-content-right">
          <h2>HELP & SUPPORT</h2>
          <ul>
            <li>FAQs</li>
            <li>Customer Support</li>
            <li>Order Tracking</li>
            <li>Return Policy</li>
          </ul>
        </div>

        {/* Right Section - Contact Us */}
        <div className="footer-content-right">
          <h2>CONTACT US</h2>
          <ul>
            <li>Email: support@nomnom.com</li>
            <li>Phone: +877 956 7899</li>
           
          </ul>
        </div>
      </div>

      <hr />

   
    </div>
  );
};

export default Footer;
