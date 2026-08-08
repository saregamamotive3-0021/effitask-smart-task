import React, { useState } from "react";
import "./SetNewPassword.css";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

const SetNewPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Invalid or missing reset link.");
      return;
    }

    if (!password || !confirmPassword) {
      alert("Please enter both passwords.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://effitask-smart-task.onrender.com/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Could not reset password.");
        return;
      }

      alert("Password changed successfully!");

      navigate("/login");

    } catch (error) {
      console.error("Reset password error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="set-password-page">
      <div className="set-password-container">
        <div className="set-password-card">

          <h2>Set New Password</h2>

          <p className="set-password-description">
            Create a new password for your EffiTask account.
          </p>

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <label htmlFor="password">
                New Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">
                Confirm New Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                required
              />
            </div>

            <p className="password-requirements">
              Password must be at least 8 characters and contain
              letters, numbers, and a special character.
            </p>

            <button
              type="submit"
              className="set-password-btn"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save New Password"}
            </button>

          </form>

          <p className="set-password-footer">
            Remember your password?{" "}
            <Link to="/login">Login</Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default SetNewPassword;