import React,{useState} from "react";
import "./Subscrip.css";

function Subscrip() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubscribe = () => {
        const user = localStorage.getItem("user");

        if (!user) {
            alert("⚠️ Please login first!");
            return;
        }

        if (!name || !email) {
            alert("⚠️ Please fill all fields!");
            return;
        }

        if (!email.includes("@")) {
            alert("Enter a valid email!");
            return;
        }

        alert("Subscribed!");
    };

    return (
        <div className="subscription" id="subscrib">
            <h1 className="head">Subscription</h1>

            <div className="input-form">
                <label>Name</label>
                <input
                    type="text"
                    placeholder="Full Name"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label>Email</label>
                <input
                    type="email"
                    placeholder="Email Address"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button className="Subscribe" onClick={handleSubscribe}>
                    Subscribe
                </button>

            </div>
        </div>
    );
}

export default Subscrip;
