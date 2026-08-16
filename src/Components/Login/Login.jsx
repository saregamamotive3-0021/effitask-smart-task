import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("https://effitask-smart-task.onrender.com/login", {
                email,
                password,
            });


console.log("FULL RESPONSE:", response.data);
console.log("USER:", response.data.user);

            if (response.data.success) {
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user),
                );

                navigate("/");
               
                
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Login failed");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Login</h2>

                <form>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="button"
                        className="login-btn"
                        onClick={handleLogin}
                    >
                        Login
                    </button>

                    <p className="signup-text">
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
