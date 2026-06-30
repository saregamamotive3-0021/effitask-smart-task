import React, { useState } from "react";
import "./Banner.css";
import Goalsmanagement from "../../assets/Goal_manage.png";

const Banner = () => {
    const [activeCard, setActiveCard] = useState(0);

    return (
        <div className="ban-container">
            <div className="hero-section">
                <div className="hero-content">
                    <h1 className="banner-heading">
                        Manage Goals <span>Easily</span>
                    </h1>

                    <p className="banner-subheading">
                        Organize tasks, prioritize important work, and track
                        progress with intuitive analytics designed to boost
                        productivity.
                    </p>

                    <ul className="banner-list">
                        <li className="banner-desc">
                            <span>➤</span> Create and manage multiple tasks
                            effortlessly
                        </li>

                        <li className="banner-desc">
                            <span>➤</span> Separate important tasks from regular
                            tasks
                        </li>

                        <li className="banner-desc">
                            <span>➤</span> Visualize progress through
                            interactive analytics
                        </li>

                        <li className="banner-desc">
                            <span>➤</span> Simplify project planning and goal
                            tracking
                        </li>
                    </ul>
                </div>

                <div className="hero-image">
                    <img
                        src={Goalsmanagement}
                        alt="Task Management"
                        className="GoalsImg"
                    />
                </div>
            </div>

            <div className="features">
                <div
                    className={`feature-card ${activeCard === 0 ? "active" : ""}`}
                    onClick={() => setActiveCard(0)}
                >
                    <div className="feature-icon">📋</div>
                    <h3>Organize Tasks</h3>
                    <p>Keep all your tasks structured and easy to manage.</p>
                </div>
                <div
                    className={`feature-card ${activeCard === 1 ? "active" : ""}`}
                    onClick={() => setActiveCard(1)}
                >
                    <div className="feature-icon">📊</div>
                    <h3>Track Progress</h3>
                    <p>Monitor completed and pending tasks efficiently.</p>
                </div>
                <div
                    className={`feature-card ${activeCard === 2 ? "active" : ""}`}
                    onClick={() => setActiveCard(2)}
                >
                    <div className="feature-icon">🎯</div>
                    <h3>Achieve Goals</h3>
                    <p>
                        Stay focused on your weekly, monthly, and yearly
                        targets.
                    </p>
                </div>

                <div
                    className={`feature-card ${activeCard === 3 ? "active" : ""}`}
                    onClick={() => setActiveCard(3)}
                >
                    <div className="feature-icon">★</div>
                    <h3>Priority Tasks</h3>
                    <p>Highlight important tasks and focus on what matters.</p>
                </div>
            </div>
        </div>
    );
};

export default Banner;
