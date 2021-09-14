import React, { useState } from "react";
import "./scss/style.scss";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <div className="login_container">
      {!isSignUp ? (
        <div className="sign_in">
          <h2>Sign in to your Swit account</h2>
          <form className="sign_in_form">
            <label htmlFor="">Email address</label>
            <input
              autoFocus="on"
              type="text"
              placeholder="customer@example.com"
            />
            <label htmlFor="">Password</label>
            <input type="password" placeholder="Enter your password." />
            <div className="checkbox">
              <input type="checkbox" id="checkBox" />
              <label htmlFor="checkBox">Remember me</label>
            </div>
            <div className="submit_btn">
              <button type="submit">Sign in</button>
            </div>
          </form>
          <p>
            Don't you have an account?{" "}
            <span onClick={() => setIsSignUp(!isSignUp)}>Sign Up</span>
          </p>
        </div>
      ) : (
        <div className="sign_up">
          <h2>Sign up for free</h2>
          <form className="sign_up_form">
            <div className="full">
              <div className="first">
                <label htmlFor="firstName">First name</label>
                <input type="text" id="firstName" placeholder="First name" />
              </div>
              <div className="last">
                <label htmlFor="lastName">Last name</label>
                <input type="text" id="lastName" placeholder="Last name" />
              </div>
            </div>
            <label htmlFor="">Email Address</label>
            <input type="email" placeholder="customer@example.com" />
            <label htmlFor="">Password</label>
            <input
              type="password"
              placeholder="Enter your password. (at least 8 characters)"
            />
            <div className="submit_btn">
              <button type="submit">Sign up</button>
            </div>
          </form>
          <p>
            Already have Swit account?{" "}
            <span onClick={() => setIsSignUp(!isSignUp)}>Sign In</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
