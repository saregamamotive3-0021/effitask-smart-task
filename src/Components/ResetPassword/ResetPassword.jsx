import React, { useState } from "react";
import "./Signup.css";
import {
  Link,
  useSearchParams,
  useNavigate,
} from "react-router-dom";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Invalid reset link");
      return;
    }

    if (!password || !confirmPassword) {
      alert("Please fill all details");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      alert(
        "Password must be at least 8 characters long and include letters, numbers, and a special character"
      );
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
        alert(data.message);
        return;
      }

      alert("Password reset successfully!");

      navigate("/login");

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-card">

          <h2>Reset Password</h2>

          <p className="login-text">
            Create a new password for your account.
          </p>

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <label>New Password</label>

              <input
                type="password"
                name="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Confirm Password</label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
              />
            </div>

            <p className="login-text">
              Password must contain at least 8 characters,
              including letters, numbers and a special character.
            </p>

            <button
              type="submit"
              className="signup-btn"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            <p className="login-text">
              Remember your password?{" "}
              <Link to="/login">Login</Link>
            </p>

          </form>

        </div>
      </div>
    </div>
  );
};

export default ResetPassword;