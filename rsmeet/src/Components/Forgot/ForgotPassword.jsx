import React, { useState } from "react";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import axios from "axios";

const ForgotPassword = ({getApiData}) => {
  const [forgotEmail, setforgotEmail] = useState({
    mail: "",
  });

  const [fpMessage, setfpMessage] = useState({
    message : '',
    display:"none",
    loginDisplay:"none"
  })


  const sendMail = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("email", forgotEmail.mail);
    let url = 'http://localhost:9000/login/sendMail';

    
     getApiData(formData,url).then((res) => {
      setfpMessage({message:'Mail will be sent if this mail id exist on our system',display:'block',loginDisplay:"none"});
      })
      .catch((error) => {
        setfpMessage({message:"something went wrong",display:'block',loginDisplay:"inline-block"});
      });
  };

  return (
    <div className="p-4">
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

        
        <p className="mt-3" style={{display:fpMessage.display}}>
        {fpMessage.message}
        <span style={{display:fpMessage.loginDisplay}} >
            <Link to='/Sign-Up' style={{color:"rgb(62, 236, 90)"}} >. Sign Up </Link>
        </span>
        </p>
        

      </form>

      <Link className="mt-3" to="/Login" style={{ color: "#3EEC5A" }}>
        Back to Login
      </Link>




    </div>
  );
};

export default ForgotPassword;
