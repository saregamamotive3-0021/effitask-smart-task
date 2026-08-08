import React, { useState } from "react";
import "./ResetPassword.css";
import { Link, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      alert("Please enter both passwords");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!token) {
      alert("Invalid or missing reset token");
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

      alert(data.message);

      if (response.ok) {
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      alert("Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <div className="reset-password-card">
          <h2>Reset Password</h2>

          <p className="reset-password-description">
            Enter your new password below.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="password">New Password</label>

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
                Confirm Password
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
              Make sure your new password is strong and secure.
            </p>

            <button
              type="submit"
              className="reset-password-btn"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <p className="reset-password-footer">
            Remember your password?{" "}
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;