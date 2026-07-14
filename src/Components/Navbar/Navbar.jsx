import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import hamburger from "../../assets/hamburger.png";
import close from "../../assets/close.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [showNavbar, setNavbar] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  // const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");

    navigate("/");
    window.location.reload();
  };

  const clickAction2 = () => {
    navigate("/signup");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 270) {
        setNavbar(false);
      } else {
        setNavbar(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToBanner = () => {
    const subscrib = document.getElementById("subscrib");

    if (subscrib) {
      subscrib.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <nav className={`nav-container ${showNavbar ? "show" : "hide"}`}>
      <p className="TaskNav">EffiTask</p>
      <ul className={`nav-ul ${menuOpen ? "active" : ""}`}>
        <li className="nav-list">
          {" "}
          <Link to="/"   onClick={() => setMenuOpen(false)}> Home</Link>
        </li>
        <li className="nav-list">
          {" "}
          <Link to="/showtasks"   onClick={() => setMenuOpen(false)}>Task Tracker</Link>
        </li>
        <li className="nav-list">
          <Link to="/form"   onClick={() => setMenuOpen(false)}>Add Tasks</Link>
        </li>
            <li
        className="nav-list"
        onClick={() => {
            scrollToBanner();
            setMenuOpen(false);
        }}
    >
        Subscription
    </li>

        {!isLoggedIn && (
          <button onClick={clickAction2} className="btn-login">
            Sign Up
          </button>
        )}

        {isLoggedIn && (
          <button onClick={handleLogout} className="btn-login">
            Logout
          </button>
        )}
      </ul>


      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <img
          src={menuOpen ? close:hamburger}
          alt="Menu"
          className="menu-img"
        />
      </div>
    </nav>
  );
};

export default Navbar;
