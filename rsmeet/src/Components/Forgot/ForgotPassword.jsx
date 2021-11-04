import React, { useState } from "react";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import axios from "axios";

const ForgotPassword = ({getApiData}) => {
  const [forgotEmail, setforgotEmail] = useState({
    mail: "",
  });

  const sendMail = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("email", forgotEmail.mail);
    let url = 'http://localhost:9000/login/sendMail';

    
     getApiData(formData,url).then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header haderTitle="Forgot Password" height="100px" width="100px" />

      <form
        action=""
        method="POST"
        onSubmit={(e) => {
          sendMail(e);
        }}
      >
        <section className=" mt-3">
          <label className="form-label" htmlFor="forgot-email">
            Email
          </label>
          <div className="usernameHolder p-3 input-group">
            <input
              className="form-control"
              type="email"
              name="email"
              id="forgot-email"
              placeholder="Email"
              value={forgotEmail.mail}
              required=""
              pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              onInput={(e) => {
                e.target.setCustomValidity("");
              }}
              onInvalid={(e) => {
                e.target.setCustomValidity("Email Must not be empty");
              }}
              onChange={(e) => {
                setforgotEmail({ ...forgotEmail, mail: e.target.value });
              }}
            />
          </div>
        </section>

        <section className="w-100 " style={{ textAlign: "center" }}>
          <button className="py-2 px-3 signInButton mt-3" type="submit">
            {" "}
            <span style={{ color: "white" }}> send </span>{" "}
          </button>
        </section>
      </form>

      <Link className="mt-3" to="/Login" style={{ color: "#3EEC5A" }}>
        Back to Login
      </Link>
    </>
  );
};

export default ForgotPassword;
