import React, { useState } from "react";
import "./scss/style.scss";
import { createUsers, validateUsers } from "../../actions/userActions";
import { StateProvider } from "../../Context/StateContext";
import { Redirect } from "react-router-dom";

const Login = () => {
  const { userAction: user, dispatch, isFetching } = StateProvider();

  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    incorrect: "",
  });
  console.log(isFetching);
  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };
  const createAndResponse = async (userData, dispatch) => {
    const responseMessage = await createUsers(userData, dispatch);
    setMessage(responseMessage);
  };
  const validateAndResponse = async (userData, dispatch) => {
    const responseMessage = await validateUsers(userData, dispatch);
    // setMessage(responseMessage);
    responseMessage && setErrorMessage({ incorrect: responseMessage.error });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };
    if (isSignUp) {
      createAndResponse(userData, dispatch);
    } else {
      validateAndResponse(userData, dispatch);
    }
  };
  return (
    <>
      {user.isLogged && <Redirect to="swit/home" />}
      <div className="login_container">
        {!isSignUp ? (
          <div className="sign_in">
            <h2>Sign in to your Swit account</h2>
            <form className="sign_in_form" onSubmit={handleSubmit}>
              <label htmlFor="">Email address</label>
              <input
                autoFocus="on"
                type="text"
                placeholder="customer@example.com"
                name="email"
                onChange={handleChange}
              />
              <label htmlFor="">Password</label>
              <input
                type="password"
                placeholder="Enter your password."
                name="password"
                onChange={handleChange}
              />
              <div className="errors">{errorMessage.incorrect}</div>
              <div className="checkbox">
                <input type="checkbox" id="checkBox" />
                <label htmlFor="checkBox">Remember me</label>
              </div>
              <div className="submit_btn">
                <button type="submit" disabled={isFetching}>
                  {" "}
                  {isFetching ? "Please wait..." : "Sign in"}
                </button>
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

            {message.errors && (
              <div
                style={{
                  border: "1px solid red",
                  width: "70%",
                  padding: "0.5rem",
                  boxSizing: "border-box",
                }}
              >
                {message.errors.map((data, i) => {
                  const { msg } = data;
                  return (
                    <div
                      style={{
                        color: "red",
                        fontSize: "0.8rem",
                      }}
                      key={i}
                    >
                      {msg}
                    </div>
                  );
                })}
              </div>
            )}
            <form className="sign_up_form" onSubmit={handleSubmit}>
              <div className="full">
                <div className="first">
                  <label htmlFor="firstName">First name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First name"
                    onChange={handleChange}
                  />
                </div>
                <div className="last">
                  <label htmlFor="lastName">Last name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last name"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <label htmlFor="">Email Address</label>
              <input
                type="text"
                name="email"
                placeholder="customer@example.com"
                onChange={handleChange}
              />
              <div className="errors">{message.message}</div>
              <label htmlFor="">Password</label>
              <input
                type="password"
                placeholder="Enter your password. (at least 8 characters)"
                name="password"
                onChange={handleChange}
              />

              <div className="submit_btn">
                <button type="submit" disabled={isFetching}>
                  {isFetching ? "Please wait..." : "Sign up"}
                </button>
              </div>
            </form>
            <p>
              Already have Swit account?{" "}
              <span onClick={() => setIsSignUp(!isSignUp)}>Sign In</span>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
