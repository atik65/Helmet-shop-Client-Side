import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "./login.css";
import googleLogo from "../../images/search.png";
import logo from "../../images/helmet-logo.png";
import useAuth from "../../hooks/useAuth";
import { useHistory, useLocation } from "react-router";
import { NavLink } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const location = useLocation();
  const { googleSignIn, createUser, signIn, loading } = useAuth();
  const [regesterd, setRegestered] = useState(false);

  // const redirect_uri = location?.state?.from || "/";

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (regesterd) {
      signIn(data.email, data.password, location, history);
    } else {
      createUser(data.email, data.password, location, history, data.name);
    }

    // reset();
  };

  return (
    <div className="login">
      <div>
        <NavLink className="login-logo" to="/">
          <img src={logo} alt="" />{" "}
          <h2>
            Helmet<span>Mania</span>
          </h2>
        </NavLink>
      </div>

      <div className="login-form-parent">
        <div className="login-form">
          <h4 className="mt-2">
            {regesterd ? "Login With" : " Register With"}
          </h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            {regesterd ? (
              ""
            ) : (
              <input
                className="form-control my-2"
                type="text"
                placeholder="Name"
                {...register("name", { required: true })}
              />
            )}

            <input
              className="form-control my-2"
              type="text"
              placeholder="Email"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />

            <input
              className="form-control"
              type="password"
              placeholder="password"
              {...register("password", { required: true })}
            />

            <input
              className="email-login my-2"
              type="submit"
              value={regesterd ? "Log In" : "Register"}
            />
          </form>
          or
          <div
            onClick={() => googleSignIn(location, history)}
            className="google-login mb-2"
          >
            <div className="col-1">
              <img className="google-logo" src={googleLogo} alt="" />
            </div>
            <div className="col-11 text-center">Continue with Google</div>
          </div>
          <p>
            {regesterd ? "   Don't have an account?" : "Already an User?"}
            {regesterd ? (
              <span
                className="swith-login"
                onClick={() => setRegestered(!regesterd)}
              >
                Create an Account{" "}
              </span>
            ) : (
              <span
                onClick={() => setRegestered(!regesterd)}
                className="swith-login"
              >
                Log in{" "}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
