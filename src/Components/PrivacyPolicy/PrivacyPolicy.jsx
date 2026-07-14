import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <div className="privacy-card">
        <h1>Privacy Policy</h1>

        <p><strong>Last Updated:</strong> July 14, 2026</p>

        <h2>1. Information We Collect</h2>
        <p>
          EffiTask collects the following information when you create an
          account:
        </p>

        <ul>
          <li>Full Name</li>
          <li>Email Address</li>
          <li>Encrypted Password</li>
          <li>Tasks and task-related information you create</li>
        </ul>

        <h2>2. How We Use Your Information</h2>

        <p>Your information is used to:</p>

        <ul>
          <li>Create and manage your account.</li>
          <li>Save and organize your tasks.</li>
          <li>Provide reminders and task management features.</li>
          <li>Improve the quality of our services.</li>
        </ul>

        <h2>3. Password Security</h2>

        <p>
          Your password is securely encrypted before being stored. We never
          store your password in plain text.
        </p>

        <h2>4. Data Sharing</h2>

        <p>
          EffiTask does not sell, rent, or share your personal information with
          third parties
        </p>

        <h2>5. Data Security</h2>

        <p>
          We use reasonable security measures to protect your personal
          information from unauthorized access.
        </p>

        <h2>6. Your Rights</h2>

        <p>You may request to:</p>

        <ul>
          <li>Update your information.</li>
          <li>Delete your saved tasks.</li>
        </ul>

        <h2>7. Changes to this Policy</h2>

        <p>
          We may update this Privacy Policy from time to time. Changes will be
          posted on this page.
        </p>

        <h2>8. Contact</h2>

        <p>
          If you have any questions regarding this Privacy Policy, please
          contact the EffiTask team.
        </p>

        <p className="footer">
          By creating an account, you agree to this Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;