import React from "react";
import "./Footer.css";
import {Link} from "react-router-dom";

const Footer = () => {

        const scrollToBanner2 = () => {
        const subscrib = document.getElementById("subscrib");

        if (subscrib) {
            subscrib.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h2>EffiTask</h2>
          <p>
            Organize your tasks, track progress, and achieve your goals
            efficiently.
          </p>
        </div>

        <div className="footer-center">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/"> Home</Link>
            </li>
            <li className="nav-list">
              {" "}
              <Link to="/showtasks">Task Tracker</Link>
            </li>
            <li className="nav-list">
              <Link to="/form">Add Tasks</Link>
            </li>
            <li className="nav-list" onClick={scrollToBanner2}>
              Subscription
            </li>
          </ul>
        </div>

        <div className="footer-right">
          <h3>Why Choose Us?</h3>
          <ul>
            <li>✔ Easy Task Management</li>
            <li>✔ Task Analytics</li>
            <li>✔ Goal Tracking</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 Task Manager. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
