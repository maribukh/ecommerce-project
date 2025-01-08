import React, { useState } from "react";
import "../Styles/Footer.css";

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
          <h4>Brand</h4>
          <p>
            Best information about the company goes here but now lorem ipsum is
          </p>
          <div className="social-icons">
            {/* Замени ссылки на настоящие иконки/ссылки */}
            <span>🔗</span>
            <span>🔗</span>
            <span>🔗</span>
            <span>🔗</span>
          </div>
        </div>
        <div className="footer-links">
          <div>
            <h4>About</h4>
            <ul>
              <li>About Us</li>
              <li>Find Store</li>
              <li>Categories</li>
              <li>Blogs</li>
            </ul>
          </div>
          <div>
            <h4>Partnership</h4>
            <ul>
              <li>About Us</li>
              <li>Find Store</li>
              <li>Categories</li>
              <li>Blogs</li>
            </ul>
          </div>
          <div>
            <h4>Information</h4>
            <ul>
              <li>Help Center</li>
              <li>Money Refund</li>
              <li>Shipping</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
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
          <img src="/path-to-app-store-icon.png" alt="App Store" />
          <img src="/path-to-google-play-icon.png" alt="Google Play" />
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2023 Ecommerce.</p>
        <div className="footer-language">
          <span>🇺🇸 English</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
