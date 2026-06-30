import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-left">
                    <h2>EffiTask</h2>
                    <p>
                        Organize your tasks, track progress, and achieve your
                        goals efficiently.
                    </p>
                </div>

                <div className="footer-center">
                    <h3>Tabs</h3>
                    <ul>
                        <li>Home</li>
                        <li>Task Tracker</li>
                        <li>Add Tasks</li>
                        <li>Subscription</li>
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