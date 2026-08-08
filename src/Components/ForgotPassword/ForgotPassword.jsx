import React, { useState } from "react";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            alert("Please enter your email");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                "https://effitask-smart-task.onrender.com/forgot-password",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                }
            );

            const data = await response.json();

            alert(data.message);

            if (response.ok) {
                setEmail("");
            }
        } catch (error) {
            console.error(error);
            alert("Error sending reset link");
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
                        Enter your registered email address and
                        we'll send you a password reset link.
                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className="input-group">
                            <label>Email</label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
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