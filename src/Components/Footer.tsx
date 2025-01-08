import React, { useState } from "react";
import "../Styles/Footer.css";
import headerLogo from "../assets/images/logo/Layout/Brand/logo-colored.svg";
import FacebookLogo from "../assets/images/icons/socialMedia/facebook3.svg";
import TwitterLogo from "../assets/images/icons/socialMedia/twitter3.svg";
import LinkedinLogo from "../assets/images/icons/socialMedia/linkedin3.svg";
import InstagramLogo from "../assets/images/icons/socialMedia/instagram3.svg";
import YoutubeLogo from "../assets/images/icons/socialMedia/youtube3.svg";
import appleMarket from "../assets/images/icons/applications/market-button.svg";
import googleMarket from "../assets/images/icons/applications/market-google.svg";
import usa from "../assets/images/icons/US@2x.svg";
import DropDown from "../assets/images/icons/dropDown.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-newsletter">
        <h3>Subscribe on our newsletter</h3>
        <p>
          Get daily news on upcoming offers from many suppliers all over the
          world
        </p>
        <div className="newsletter-form">
          <input type="email" placeholder="Email" />
          <button>Subscribe</button>
        </div>
      </div>
      <div className="footer-main">
        <div className="footer-brand">
          <img src={headerLogo} alt="logo" />
          <p>
            Best information about the company goes here but now lorem ipsum is
          </p>
          <div className="social-icons">
            <img src={FacebookLogo} alt="fb" />
            <img src={TwitterLogo} alt="fb" />
            <img src={LinkedinLogo} alt="fb" />
            <img src={InstagramLogo} alt="fb" />
            <img src={YoutubeLogo} alt="fb" />
          </div>
        </div>
        <div className="footer-links">
          <div className="info">
            <h4>About</h4>
            <ul>
              <li>About Us</li>
              <li>Find Store</li>
              <li>Categories</li>
              <li>Blogs</li>
            </ul>
          </div>
          <div className="info">
            <h4>Partnership</h4>
            <ul>
              <li>About Us</li>
              <li>Find Store</li>
              <li>Categories</li>
              <li>Blogs</li>
            </ul>
          </div>
          <div className="info">
            <h4>Information</h4>
            <ul>
              <li>Help Center</li>
              <li>Money Refund</li>
              <li>Shipping</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div className="info">
            <h4>For Users</h4>
            <ul>
              <li>Login</li>
              <li>Register</li>
              <li>Settings</li>
              <li>My Orders</li>
            </ul>
          </div>
        </div>
        <div className="footer-app">
          <h4>Get App</h4>
          <img src={appleMarket} alt="App Store" />
          <img src={googleMarket} alt="Google Play" />
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2023 Ecommerce.</p>
        <div className="footer-language">
          <img src={usa} alt="us" />
          <span>English</span>
          <img src={DropDown} alt="" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
