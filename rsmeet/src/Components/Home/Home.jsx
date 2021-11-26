import React, { useState, useEffect } from "react";
import { Router, Switch, Route, useHistory, Redirect } from "react-router-dom";
import GetStarted from "../GetStarted/GetStarted";
import Login from "../Login/Login";
import ForgotPassword from "../Forgot/ForgotPassword";
import Signup from "../Signup/Signup";
import MailVerify from "../Verify/MailVerify";
import ProfileSet from "../ProfileSet/ProfileSet";
import ResetPass from "../ResetPassword/ResetPass";
import ErrorPage from "../Error/ErrorPage";
import BlankDp from "../../Assets/image/blankDp.png";
import Dashboard from "../Dashboard/Dashboard";
import { useCookies } from "react-cookie";
import jwt from "jsonwebtoken";
import axios from "axios";
import "./Home.css";
import { getApiData } from "../../apis/api.js";
import { BsChevronDoubleLeft } from "react-icons/bs";

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

  const [urlChanged, seturlChanged] = useState(false);
  const [authTokenValues, setauthTokenValues] = useState({
    auth: false,
    username: "",
    verified: false,
  });

  const [LoginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [cookies, setcookies] = useCookies(["authToken"]);

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
        setcookies("authToken", output.token, { path: "/" });
        setverifyEmailData({ ...verifyEmailData, email: LoginData.username });
        history.push("/dashboard");
      } else {
        alert(output.Message);
      }
    });

    //setLoginData({username:"",password:""});
  };

  const isRegDetails = () => {
    if (authTokenValues.verified && authTokenValues.username !== " ")
      return true;
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
        setcookies("authToken", output.token, { path: "/" });
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

        history.push("/dashboard");
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
        console.log(output);
        if (output.token) {
          setcookies("authToken", output.token, { path: "/" });
          history.push("/dashboard");
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
    if (cookies.authToken) {
      try {
        console.log(typeof process.env.REACT_APP_JWT_CODE);
        jwt.verify(cookies.authToken, process.env.REACT_APP_JWT_CODE);

        let decode = jwt.decode(cookies.authToken);
        console.log(decode);
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
      history.push("/");
    }
  };

  useEffect(() => {
    CheckIfLoggedin();
  }, [historyChanged, cookies.authToken]);

  return (
    <Router history={history}>
      <Switch>
        <div
          className="home-container  background d-flex justify-content-center align-items-center overflow-auto"
          style={{ backgroundImage: `url(${backImage})` }}
        >
          <section
            className="home-view d-flex flex-column justify-content-center align-items-center"
            style={{}}
          >
            

            
            <Route exact path="/" component={GetStarted}></Route>

            <Route
              exact
              path="/Login"
              render={(props) =>
                authTokenValues.auth ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <Login
                    LoginData={LoginData}
                    setLoginData={setLoginData}
                    LoginForm={LoginForm}
                  />
                )
              }
            />
            <Route
              exact
              path="/Sign-up"
              render={(props) =>
                authTokenValues.auth ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <Signup
                    regData={regData}
                    setregData={setregData}
                    handleRegSubmit={HandleRegSubmit}
                    getApiData={getApiData}
                  />
                )
              }
            />
            <Route
              exact
              path="/Forgot-Password"
              render={(props) => <ForgotPassword getApiData={getApiData} />}
            ></Route>

            <Route
              exact
              path="/verify-mail"
              render={(props) =>
                authTokenValues.verified ? (
                  <Redirect to="/Profile-Set" />
                ) : (
                  <MailVerify
                    handleVerifyEmail={handleVerifyEmail}
                    verifyEmailData={verifyEmailData}
                    setverifyEmailData={setverifyEmailData}
                  />
                )
              }
            />

            <Route
              exact
              path="/reset-password/:key"
              render={(props) => (
                <ResetPass
                  rpdata={rpdata}
                  setrpdata={setrpdata}
                  handleResetPasswordForm={handleResetPasswordForm}
                  rpMessage={rpMessage}
                />
              )}
            />

            <Route
              exact
              path="/Profile-Set"
              render={(props) =>
                authTokenValues.username === " " ? (
                  <ProfileSet
                    regData={regData}
                    setregData={setregData}
                    token={cookies.authToken}
                    setcookies={setcookies}
                  />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />

           

            <Route
              exact
              path="/dashboard"
              render={(props) =>
                isRegDetails() ? (
                  <Dashboard />
                ) : authTokenValues.verified ? (
                  <Redirect to="/Profile-set" />
                ) : (
                  <Redirect to="/verify-mail" />
                )
              }
            />

            {/* <Route path="*" component={ErrorPage} /> */}
          </section>
        </div>

        <Route
          exact
          path="/dashboard"
          render={(props) =>
            isRegDetails() ? (
              <Dashboard />
            ) : authTokenValues.verified ? (
              <Redirect to="/Profile-set" />
            ) : (
              <Redirect to="/verify-mail" />
            )
          }
        />

        {/* <Route path="*" component={ErrorPage} /> */}

        {/* If user is logged in that means jwt will created then redirect to dashboard else get started */}
      </Switch>

      {/* Here dashboard page will be here */}
    </Router>
  );
};

export default Home;
