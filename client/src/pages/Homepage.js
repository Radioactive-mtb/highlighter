import React from "react";
import Login from "./Login";
import Signup from "./Signup";

const Homepage = () => {
  return (
    <div className="homepage">
      <h1>Welcome to the Highlighter Calendar App!</h1>
      <p>Login to your account:</p>
      <Login />
      <p>Don't have an account? Sign up:</p>
      <Signup />
    </div>
  );
};

export default Homepage;
