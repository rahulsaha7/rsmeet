import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import GetStarted from "../GetStarted/GetStarted";
import Login from "../Login/Login";
import ForgotPassword from "../Forgot/ForgotPassword";
import Signup from "../Signup/Signup";
import MailVerify from "../Verify/MailVerify";
import ProfileSet from "../ProfileSet/ProfileSet";
import ResetPass from "../ResetPassword/ResetPass";

import BlankDp from "../../Assets/image/blankDp.png";

import { useCookies } from "react-cookie";
import jwt from "jsonwebtoken";

import "./Home.css";
import { getApiData } from "../../apis/api.js";

import DashRouting from "../Dashboard/DashRouting";

const Home = ({ backImage }) => {
  const [regData, setregData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    mPassword: "",
    username: "",
    image: null,
    dp: BlankDp,
  });

  const [rpdata, setrpdata] = useState({
    password: "",
    mPassword: "",
  });

  const [rpMessage, setrpMessage] = useState({
    message: "",
    display: "none",
    loginDisplay: "none",
  });

  const [verifyEmailData, setverifyEmailData] = useState({
    message: "",
    display: "none",
    email: "",
    digit1: "",
    digit2: "",
    digit3: "",
    digit4: "",
    digit5: "",
    digit6: "",
  });

  const [authTokenValues, setauthTokenValues] = useState({
    auth: false,
    username: "",
    verified: false,
  });

  const [LoginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [cookies, setcookies, removeCookies] = useCookies(["usecaseshow2y2"]);
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));

  const history = useHistory();
  let historyChanged = false;

  const LoginForm = (e) => {
    e.preventDefault();

    let url = "http://localhost:9000/login";

    let formData = new FormData();
    formData.append("email", LoginData.username);
    formData.append("password", LoginData.password);

    getApiData(formData, url).then((output) => {
      setLoginData({ username: "", password: "" });
      if (output.token) {
        //console.log(output.token);
        let decode = jwt.decode(output.token);
        setcookies("usecaseshow2y2", "cdabe", { path: "/" });
        localStorage.setItem("authToken", output.token);
        setverifyEmailData({ ...verifyEmailData, email: LoginData.username });
        jwt.verify(output.token, process.env.REACT_APP_JWT_CODE);

        let decode2 = jwt.decode(output.token);
        setauthTokenValues({
          auth: decode2.auth,
          username: decode2.username,
          verified: decode2.verified,
        });

        history.push(`/dashboard/home/${decode2.username}`);
      } else {
        alert(output.Message);
      }
    });
  };

  const isRegDetails = () => {
    if (authTokenValues.username !== " ") return true;
    return false;
  };

  const HandleRegSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("name", regData.name);
    formData.append("email", regData.email);
    formData.append("password", regData.password);
    formData.append("phone", regData.phone);

    let url = "http://localhost:9000/login/r";
    getApiData(formData, url).then((output) => {
      const data = output;

      if (data.token) {
        setcookies("usecaseshow2y2", "cdaabe", { path: "/" });
        localStorage.setItem("authToken", output.token);
        setregData({
          name: "",
          email: "",
          password: "",
          phone: "",
          mPassword: "",
          username: "",
          image: null,
          dp: BlankDp,
        });
        setverifyEmailData({ ...verifyEmailData, email: regData.email });
        jwt.verify(output.token, process.env.REACT_APP_JWT_CODE);

        let decode2 = jwt.decode(output.token);
        setauthTokenValues({
          auth: decode2.auth,
          username: decode2.username,
          verified: decode2.verified,
        });
        history.push(`/dashboard/home/${decode2.username}`);

        // history.push(`/dashboard/home/${authTokenValues.username}`);
      } else {
        alert(data.Message);
      }
    });
  };

  const handleResetPasswordForm = (e, token) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("token", token);
    formData.append("password", rpdata.password);

    let url = "http://localhost:9000/login/updatePassword";
    getApiData(formData, url)
      .then((output) => {
        if (output.update) {
          setrpMessage({
            message: output.message,
            display: "block",
            loginDisplay: "inline-block",
          });
        } else {
          setrpMessage({
            message: output.message,
            display: "block",
            loginDisplay: "none",
          });
        }
      })
      .catch((error) => {
        setrpMessage({
          message: "something went wrong",
          display: "block",
          loginDisplay: "none",
        });
      });
  };

  const handleVerifyEmail = (e) => {
    e.preventDefault();
    let formData = new FormData();
    let otp =
      verifyEmailData.digit1 +
      "" +
      verifyEmailData.digit2 +
      "" +
      verifyEmailData.digit3 +
      "" +
      verifyEmailData.digit4 +
      "" +
      verifyEmailData.digit5 +
      "" +
      verifyEmailData.digit6;

    formData.append("otpReceived", otp);
    formData.append("token", cookies.authToken);
    let url = "http://localhost:9000/login/otpVerify";
    getApiData(formData, url)
      .then((output) => {
        if (output.token) {
          setcookies("authToken", output.token, { path: "/" });
          history.push(`/dashboard/home/${authTokenValues.username}`);
        } else if (output.expired) {
          setverifyEmailData({
            display: "inline-block",
            message: "You cant change otp as you are not authenticated",
          });
        } else {
          setverifyEmailData({
            display: "inline-block",
            message: output.message,
          });
        }
      })
      .catch((error) => {
        setverifyEmailData({ display: "inline-block", message: error.message });
      });
  };

  const CheckIfLoggedin = () => {
    let authToken = localStorage.getItem("authToken");
    // console.log(authTokenValues);
    if (cookies.usecaseshow2y2) {
      try {
        jwt.verify(authToken, process.env.REACT_APP_JWT_CODE);

        let decode = jwt.decode(authToken);
        setauthTokenValues({
          auth: decode.auth,
          username: decode.username,
          verified: decode.verified,
        });
      } catch (err) {
        setauthTokenValues({
          auth: false,
          username: "",
          verified: false,
        });
        history.push("/");
      }
    } else {
      setauthTokenValues({
        auth: false,
        username: "",
        verified: false,
      });
      //  history.push("/");
    }
  };

  useEffect(() => {
    CheckIfLoggedin();
  }, [historyChanged, cookies.usecaseshow2y2]);

  return (
    <>
      <div
        className="home-container  background d-flex justify-content-center align-items-center overflow-auto"
        style={{ backgroundImage: `url(${backImage})` }}
      >
        <section
          className="home-view d-flex flex-column justify-content-center align-items-center"
          style={{}}
        >
          <Switch>
            <Route exact path="/" component={GetStarted} />

            <Route exact path="/Login">
              {authTokenValues.auth ? (
                <Redirect to={`/dashboard/home/${authTokenValues.username}`} />
              ) : (
                <Login
                  LoginData={LoginData}
                  setLoginData={setLoginData}
                  LoginForm={LoginForm}
                />
              )}
            </Route>

            <Route exact path="/Sign-up">
              {authTokenValues.auth ? (
                <Redirect to={`/dashboard/home/${authTokenValues.username}`} />
              ) : (
                <Signup
                  regData={regData}
                  setregData={setregData}
                  handleRegSubmit={HandleRegSubmit}
                  getApiData={getApiData}
                />
              )}
            </Route>

            <Route exact path="/Forgot-Password">
              {!authTokenValues.auth ? (
                <ForgotPassword getApiData={getApiData} />
              ) : (
                <Redirect to={`/dashboard/home/${authTokenValues.username}`} />
              )}
            </Route>

            <Route exact path="/verify-mail">
              {authTokenValues.verified ? (
                <Redirect to="/Profile-Set" />
              ) : (
                <MailVerify
                  handleVerifyEmail={handleVerifyEmail}
                  verifyEmailData={verifyEmailData}
                  setverifyEmailData={setverifyEmailData}
                />
              )}
            </Route>

            <Route exact path="/reset-password/:key">
              {
                <ResetPass
                  rpdata={rpdata}
                  setrpdata={setrpdata}
                  handleResetPasswordForm={handleResetPasswordForm}
                  rpMessage={rpMessage}
                />
              }
            </Route>

            <Route exact path="/Profile-Set">
              {authTokenValues.username === " " ? (
                <ProfileSet
                  regData={regData}
                  setregData={setregData}
                  setauthTokenValues={setauthTokenValues}
                />
              ) : (
                <Redirect to={`/dashboard/home/${authTokenValues.username}`} />
              )}
            </Route>

            <Route path={`/dashboard/home/:username`}>
              {isRegDetails() ? (
                <DashRouting removecookies={removeCookies} />
              ) : (
                <Redirect to="/Profile-set" />
              )}
            </Route>

            <Route exact path="/dashboard/home">
              <Redirect to={`/dashboard/home/${authTokenValues.username}`} />
            </Route>

            <Route exact path="/dashboard/">
              <Redirect to={`/dashboard/home/${authTokenValues.username}`} />
            </Route>
          </Switch>
        </section>
      </div>
    </>
  );
};

export default Home;
