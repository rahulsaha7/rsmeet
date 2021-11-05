import React, { useState, useEffect } from "react";
import { Router, Switch, Route, useHistory, Redirect } from "react-router-dom";
import GetStarted from "../GetStarted/GetStarted";
import Login from "../Login/Login";
import ForgotPassword from "../Forgot/ForgotPassword";
import Signup from "../Signup/Signup";
import MailVerify from "../Verify/MailVerify";
import ProfileSet from "../ProfileSet/ProfileSet";
import ErrorPage from "../Error/ErrorPage";
import BlankDp from "../../Assets/image/blankDp.png";
import jwt from "jsonwebtoken";
import axios from "axios";
import "./Home.css";
import { getApiData } from "../../apis/api.js";

const Home = ({ backImage }) => {
  //Every prop will be sent to child componenets using context api or redux of react but for testing.
  // but  let's do it using props sending
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

  const [urlChanged, seturlChanged] = useState(false);

  const [LoginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const history = useHistory();
  let historyChanged = false;

  const LoginForm = (e) => {
    e.preventDefault();
    console.log(LoginData);

    let url = "http://localhost:9000/login";

    let formData = new FormData();
    formData.append("email", LoginData.username);
    formData.append("password", LoginData.password);

    getApiData(formData, url).then((output) => {
      console.log(output);
    });

    //setLoginData({username:"",password:""});
  };

  const isRegDetails = () => {
    if (regData.email) return true;
    return false;
  };

  const HandleRegSubmit = (e) => {
    e.preventDefault();

    //First call axios

    let formData = new FormData();
    formData.append("name", regData.name);
    formData.append("email", regData.email);
    formData.append("password", regData.password);
    formData.append("phone", regData.phone);

    let url = "http://localhost:9000/login/r";
    getApiData(formData, url).then((output) => {
      const { data } = output;
      //  data.error || data.exist ? alert('error') : setregData({
      //     name: "",
      //     email: "",
      //     password: "",
      //     phone: "",
      //     mPassword: "",
      //     username: "",
      //     image: null,
      //     dp: BlankDp
      // });
      // if (data.token) {
      //     // let decode = jwt.decode(data.token);
      //     let decode = jwt.decode(data.token);
      //     console.log(decode);
      // }
      console.log(output);
    });

    //After successfull registration data should have to be empty

    // history.push('/Profile-Set');

    //After successfull registration jwt will contain data with verified email false
    //If verified email false then redirect to verify email

    //Else  will be redicred to set profile data

    //for first time registration verified mail will always be false

    //but verify page will come only when jwt exist else

    //will not work

    //After Registration a unique jqt token will be created and if that is set we have to push this history.
    //history.push("/Profile-Set");
  };

  const CheckIfLoggedin = () => {



  };

  useEffect(() => {
    CheckIfLoggedin();
  }, [historyChanged]);

  return (
    <Router history={history}>
      <div
        className="container-fluid background m-0 p-0 overflow-auto"
        style={{ backgroundImage: `url(${backImage})` }}
      >
        <div className="d-flex w-100 h-100 justify-content-center align-items-center p-2">
          <section className="home-view d-flex flex-column justify-content-center align-items-center">
            <Switch>
              {/* Here Routing will be protected and for that we can use protected Routing feature of  React*/}
              <Route exact path="/" component={GetStarted}></Route>

              {/* Example of private Route 
                        
                            <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
            : <Redirect to="/signin" />
        )} />

        //Example of public and protected route

                 <Route {...rest} render={props => (
            isLogin() && restricted ?
                <Redirect to="/dashboard" />
            : <Component {...props} />
        )} />


        */}

              <Route
                exact
                path="/Login"
                render={(props) => (
                  <Login
                    LoginData={LoginData}
                    setLoginData={setLoginData}
                    LoginForm={LoginForm}
                  />
                )}
              />
              <Route
                exact
                path="/Sign-up"
                render={(props) => (
                  <Signup
                    regData={regData}
                    setregData={setregData}
                    handleRegSubmit={HandleRegSubmit}
                    getApiData = {getApiData}
                  />
                )}
              />
              <Route
                exact
                path="/Forgot-Password"
                render={(props) => (
                  <ForgotPassword
                    getApiData = {getApiData}
                  />
                )}
              ></Route>

              <Route exact path = '/verify-mail' component = {MailVerify} />

              

              <Route
                exact
                path="/Profile-Set"
                render={(props) =>
                  isRegDetails() ? (
                    <ProfileSet regData={regData} setregData={setregData} />
                  ) : (
                    <Redirect to="/Sign-up" />
                  )
                }
              />

              <Route component = {ErrorPage} />

              {/* If user is logged in that means jwt will created then redirect to dashboard else get started */}
            </Switch>
          </section>
        </div>
      </div>
    </Router>
  );
};

export default Home;
