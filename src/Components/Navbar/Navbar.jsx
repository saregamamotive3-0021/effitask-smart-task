import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import hamburger from "../../assets/hamburger.png";
import close from "../../assets/close.png";
import profile from "../../assets/profile.png"

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

  /*user delete*/
  const deleteAccount = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const confirmDelete = window.confirm(
    "Are you sure you want to permanently delete your account? This action cannot be undone."
  );

  if (!confirmDelete) return;

  try {
    const response = await fetch(
      `https://effitask-smart-task.onrender.com/deleteAccount/${user.id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    alert(data.message);

    localStorage.removeItem("user");

    window.location.href = "/";
  } catch (error) {
    console.error(error);
    alert("Unable to delete account.");
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
          // <button onClick={handleLogout} className="btn-login">
          //   Logout
          // </button>
          <div className="profile-menu">
    {/* <button onClick={editUser}>Edit Username</button> */}

    <button className="delete-btn" onClick={deleteAccount}>
        Delete Account
    </button>

    <button onClick={handleLogout}>Logout</button>
  </div>
        )}
      </ul>



      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <img
          src={menuOpen ? close:hamburger}
          alt="Menu"
          className="menu-img"
        />
      </div>

      <div className="profile-image">
        <img src={profile} alt="No img"/>
      </div>
    </nav>
  );
};

export default Navbar;
