import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";

const Signup = () => {
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const signupDetails = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all details");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!acceptedPolicy) {
      alert("Please accept the Privacy Policy before signing up.");
      return;
    }

    try {
      const response = await fetch(
        "https://effitask-smart-task.onrender.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        },
      );

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error(error);
      alert("Error creating account");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create Account</h2>

        <form onSubmit={signupDetails}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {privacyPolicy && (
            <div
              className="privacy-modal-overlay"
              onClick={() => setPrivacyPolicy(false)}
            >
              <div
                className="privacy-modal"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="privacy-header">
                  <h2>Privacy Policy</h2>

                  <button
                    type="button"
                    className="close-btn"
                    onClick={() => setPrivacyPolicy(false)}
                  >
                    ×
                  </button>
                </div>

                <div className="privacy-content">
                  <h3>Welcome to EffiTask</h3>

                  <p>
                    By creating an account, you agree to the collection and use
                    of your information as described below.
                  </p>

                  <h3>Information We Collect</h3>
                  <ul>
                    <li>Your full name.</li>
                    <li>Email address.</li>
                    <li>Encrypted password.</li>
                    <li>Your tasks, reminders, and task completion status.</li>
                  </ul>

                  <h3>How We Use Your Information</h3>
                  <ul>
                    <li>To create and manage your account.</li>
                    <li>To securely save your tasks.</li>
                    <li>To send reminders within the application.</li>
                    <li>To improve the user experience.</li>
                  </ul>

                  <h3>Security</h3>

                  <p>
                    Your password is encrypted before being stored. We use
                    reasonable security measures to protect your personal
                    information.
                  </p>

                  <h3>Data Sharing</h3>

                  <p>
                    We never sell or rent your personal information to third
                    parties.
                  </p>

                  <h3>Your Rights</h3>

                  <ul>
                    <li>Update your account information.</li>
                    <li>Delete your saved tasks.</li>
                  </ul>

                  <h3>Policy Updates</h3>

                  <p>
                    This Privacy Policy may be updated periodically. Continued
                    use of EffiTask indicates your acceptance of any changes.
                  </p>
                </div>

                <div className="privacy-footer">
                  <button
                    type="button"
                    className="accept-btn"
                    onClick={() => {
                      setAcceptedPolicy(true);
                      setPrivacyPolicy(false);
                    }}
                  >
                    I Understand
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="privacy-check">
            <input
              type="checkbox"
              id="privacy"
              checked={acceptedPolicy}
              onChange={(e) => setAcceptedPolicy(e.target.checked)}
            />

            <label htmlFor="privacy">
              I have read and agree to the{" "}
              <span
                className="privacy-link"
                onClick={() => setPrivacyPolicy(true)}
              >
                Privacy Policy
              </span>
            </label>
          </div>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>

          <p className="login-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
