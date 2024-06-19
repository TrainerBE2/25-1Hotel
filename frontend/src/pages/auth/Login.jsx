import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Email:", email);
    console.log("Password:", password);
    // Redirect or perform further actions
  };

  return (
    <>
      <Header />
      <div id="preloader">
        <div className="loader"></div>
      </div>
      <div className="login-area">
        <div className="container">
          <div className="login-box ptb--100">
            <form onSubmit={handleSubmit}>
              <div className="login-form-head">
                <h4>Sign In</h4>
                <p>
                  Hello there, Sign in and start managing your Admin Template
                </p>
              </div>
              <div className="login-form-body">
                <div className="form-gp">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    id="exampleInputEmail1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <i className="ti-email"></i>
                  <div className="text-danger"></div>
                </div>
                <div className="form-gp">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    id="exampleInputPassword1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <i className="ti-lock"></i>
                  <div className="text-danger"></div>
                </div>
                <div className="row mb-4 rmber-area">
                  <div className="col-6">
                    <div className="custom-control custom-checkbox mr-sm-2">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customControlAutosizing"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customControlAutosizing"
                      >
                        Remember Me
                      </label>
                    </div>
                  </div>
                  <div className="col-6 text-right">
                    <a href="#">Forgot Password?</a>
                  </div>
                </div>
                <div className="submit-btn-area">
                  <button id="form_submit" type="submit">
                    Submit <i className="ti-arrow-right"></i>
                  </button>
                  <div className="login-other row mt-4">
                    <div className="col-6">
                      <a className="fb-login" href="#">
                        Log in with <i className="fa fa-facebook"></i>
                      </a>
                    </div>
                    <div className="col-6">
                      <a className="google-login" href="#">
                        Log in with <i className="fa fa-google"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="form-footer text-center mt-5">
                  <p className="text-muted">
                    Don't have an account? <a href="register.html">Sign up</a>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
