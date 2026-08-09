import React, { useState } from "react";
import "./ForgotPassword.css";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      alert("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      console.log("1. Sending request...");
      console.log("Email:", trimmedEmail);

      const response = await fetch(
        "https://effitask-smart-task.onrender.com/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: trimmedEmail,
          }),
        }
      );

      console.log("2. Response received");
      console.log("Status:", response.status);

      const text = await response.text();

      console.log("3. Backend response:", text);

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        alert("Server returned an invalid response.");
        return;
      }

      if (!response.ok) {
        alert(data.message || "Could not send reset link.");
        return;
      }

      alert(data.message || "Reset link sent successfully!");

      setEmail("");

      // Redirect to Set New Password page
      navigate("/set-new-password");

    } catch (error) {
      console.error("Forgot password error:", error);

      alert(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <div className="forgot-password-card">

          <h2>Forgot Password?</h2>

          <p className="forgot-password-description">
            Enter your registered email address and we'll send you
            a password reset link.
          </p>

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="forgot-password-btn"
              disabled={loading}
            >
              {loading
                ? "Sending..."
                : "Send Reset Link"}
            </button>

          </form>

          <p className="forgot-password-footer">
            Remember your password?{" "}
            <Link to="/login">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

