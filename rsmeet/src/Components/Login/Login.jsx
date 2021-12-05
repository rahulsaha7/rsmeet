import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { AiFillEye } from "react-icons/ai";
import "./Login.css";

const Login = ({ LoginData, setLoginData, LoginForm }) => {
  const [viewPass, setviewPass] = useState("password");

  return (
    <div className="p-4">
      <Header haderTitle="Signin Here" height="100px" width="100px" />

      <form
        className="w-100"
        method="POST"
        onSubmit={(e) => {
          LoginForm(e);
        }}
      >
        <section className=" mt-3">
          <label className="form-label" htmlFor="username">
            username
          </label>
          <div className="usernameHolder p-3 d-flex justify-content-center">
            {/* This restriction should in register page but I am cheking here only  */}
            <input
              className="form-control"
              type="email"
              name="userName"
              id="username"
              placeholder="username or email"
              value={LoginData.username}
              autoComplete="off"
              onInput={(e) => {
                e.target.setCustomValidity("");
              }}
              onInvalid={(e) => {
                e.target.setCustomValidity("Enter username or Email");
              }}
              required=" "
              onChange={(event) =>
                setLoginData({ ...LoginData, username: event.target.value })
              }
            />
          </div>
        </section>

        <section className=" mt-3 ">
          <label className="form-label" htmlFor="password">
            password
          </label>
          <div className="passwordHolder p-3 d-flex justify-content-center">
            <input
              className="form-control"
              type={viewPass}
              name="password"
              id="password"
              value={LoginData.password}
              placeholder="password"
              autoComplete="off"
              required=" "
              onInput={(e) => {
                e.target.setCustomValidity("");
              }}
              onInvalid={(e) => {
                e.target.setCustomValidity("Enter Password");
              }}
              onChange={(event) =>
                setLoginData({ ...LoginData, password: event.target.value })
              }
            />

            <span
              style={{
                color: "white",
                alignSelf: "center",
              }}
              onClick={() => {
                viewPass === "password"
                  ? setviewPass("text")
                  : setviewPass("password");
              }}
            >
              {" "}
              <AiFillEye />{" "}
            </span>
          </div>
        </section>

        <section className="w-100 " style={{ textAlign: "center" }}>
          <button className="py-2 px-3 signInButton mt-3" type="submit">
            <span style={{ color: "white" }}> Sign In </span>
          </button>
        </section>
      </form>

      <Link className="mt-3" to="/Forgot-Password" style={{ color: "#3EEC5A" }}>
        Forgot Password
      </Link>
      <p className="text-break mt-3">
        Don't have an account?{" "}
        <Link to="/Sign-UP" style={{ color: "#3EEC5A" }}>
          Signup
        </Link>
      </p>
    </div>
  );
};

export default Login;
