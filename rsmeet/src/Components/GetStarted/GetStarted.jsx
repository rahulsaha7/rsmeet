import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../Assets/image/logoOne.svg.png";
import "./getStarted.css";

const GetStarted = () => {

  return (
    <div className="p-4">
      <figure className="logoHolder">
        <img src={logo} alt="LOGO" />
      </figure>

      <section className="title mt-3 px-4 py-2 w-100">
        <h3 className="text-break">RSMEET</h3>
        <h4 className="ms-3 text-center text-break">Create Confidence</h4>
      </section>

      <section className="w-100 homebutton mt-4 text-center">
        <button className="py-2 px-3 signInButton mt-3" type="submit">
          {" "}
          <Link to="/Login">Get Started</Link>{" "}
        </button>
      </section>

      <p className="text-break mt-3">
        Already have an account?{" "}
        <Link to="/Login" style={{ color: "#3EEC5A" }}>
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default GetStarted;
