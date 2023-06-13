import React from "react";

import Login from "./Login";
import Signup from "./Signup";
import "./Homepage.css";
import logo from "../logo.png";

const Homepage = () => {
  return (
    <div className="homepage">
      <h1>Welcome to the Highlighter Calendar App!</h1>
      <div className="logo_image">
        <img src={logo} alt="logo" />
      </div>
      <Login />
      <br />
      <br />
      <br />
      <p>Don't have an account? Sign up:</p>
      <Signup />
    </div>
  );
};

export default Homepage;
