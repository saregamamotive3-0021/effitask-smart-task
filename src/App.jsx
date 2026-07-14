import React from "react";
import "./index.css";
import Hero from "./Components/Hero/Hero";
import Form from "./Components/Form/Form";
import Navbar from "./Components/Navbar/Navbar";
import About from "./Components/About/About";
import Dailystreak from "./Components/Analytics/Analytics";
import { Routes, Route } from "react-router-dom";
import Banner from "./Components/Banner/Banner";
import Subscrip from "./Components/Subscrip/Subscrip";
import Showtasks from "./Components/Showtasks/Showtasks";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Context from "./Context/Context";
import Footer from "./Components/Footer/Footer";
import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy";

function App() {
    return (
        <>
            <Routes>
                {/* HOME PAGE */}
                  <Route path="/login" element={<Login/>}/>
                <Route
                    path="/"
                    element={
                        <>
                            <Navbar />
                            <Hero />
                            <About title="Manage Tasks With EffiTask" />
                            <Dailystreak />
                            <Banner />
                            <Subscrip />
                            <Footer/>
                        </>
                    }
                />

                {/* FORM PAGE */}
                {/* <Route path="/form" element={<Form />} /> */}
                {/* <Route path="/showtasks" element={<Showtasks />} /> */}
             

                <Route
                    path="/form"
                    element={
                        <Context>
                            <Form />
                        </Context>
                    }
                />

                 <Route
                    path="/showtasks"
                    element={
                        <Context>
                            <Showtasks/>
                        </Context>
                    }
                />
                <Route path="/signup" element={<Signup />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
            </Routes>
        </>
    );
}

export default App;
