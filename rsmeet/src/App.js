

import Home from './Components/Home/Home';
import Background from './Assets/image/Background2.png';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';




function App() {
 

  return (
    <Router>
      <Switch>
          <Route export path ="/">
            <Home backImage = {Background} />
          </Route>
        </Switch>
        
    </Router>
  );
}

export default App;





// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   useHistory,
//   Redirect,
// } from "react-router-dom";

// import GetStarted from "./Components/GetStarted/GetStarted";
// import backImage from './Assets/image/Background2.png';
// import Login from "./Components/Login/Login";
// import ForgotPassword from "./Components/Forgot/ForgotPassword";
// import Signup from "./Components/Signup/Signup";
// import MailVerify from "./Components/Verify/MailVerify";
// import ProfileSet from "./Components/ProfileSet/ProfileSet";
// import ResetPass from "./Components/ResetPassword/ResetPass";
// import BlankDp from "./Assets/image/blankDp.png";
// import Dashboard from "./Components/Dashboard/Dashboard";
// import DashRouting from "./Components/Dashboard/DashRouting";
// import { useCookies } from "react-cookie";
// import jwt from "jsonwebtoken";
// import "./Components/Home/Home.css";
// import { getApiData } from "./apis/api";
// // import { BsChevronDoubleLeft } from "react-icons/bs";


// const App = () => {
//   const [regData, setregData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     mPassword: "",
//     username: "",
//     image: null,
//     dp: BlankDp,
//   });

//   const [rpdata, setrpdata] = useState({
//     password: "",
//     mPassword: "",
//   });

//   const [rpMessage, setrpMessage] = useState({
//     message: "",
//     display: "none",
//     loginDisplay: "none",
//   });

//   const [verifyEmailData, setverifyEmailData] = useState({
//     message: "",
//     display: "none",
//     email: "",
//     digit1: "",
//     digit2: "",
//     digit3: "",
//     digit4: "",
//     digit5: "",
//     digit6: "",
//   });

//   const [urlChanged, seturlChanged] = useState(false);
//   const [authTokenValues, setauthTokenValues] = useState({
//     auth: false,
//     username: "",
//     verified: false,
//   });

//   const [LoginData, setLoginData] = useState({
//     username: "",
//     password: "",
//   });

//   const [cookies, setcookies] = useCookies(["authToken"]);

//   const history = useHistory();
//   let historyChanged = false;

//   const LoginForm = (e) => {
//     e.preventDefault();

//     let url = "http://localhost:9000/login";

//     let formData = new FormData();
//     formData.append("email", LoginData.username);
//     formData.append("password", LoginData.password);

//     getApiData(formData, url).then((output) => {
//       setLoginData({ username: "", password: "" });
//       if (output.token) {
//         setcookies("authToken", output.token, { path: "/" });
//         setverifyEmailData({ ...verifyEmailData, email: LoginData.username });
//         history.push("/dashboard/home");
//       } else {
//         alert(output.Message);
//       }
//     });

//     //setLoginData({username:"",password:""});
//   };

//   const isRegDetails = () => {
//     if (authTokenValues.verified && authTokenValues.username !== " ")
//       return true;
//     return false;
//   };

//   const HandleRegSubmit = (e) => {
//     e.preventDefault();

//     let formData = new FormData();
//     formData.append("name", regData.name);
//     formData.append("email", regData.email);
//     formData.append("password", regData.password);
//     formData.append("phone", regData.phone);

//     let url = "http://localhost:9000/login/r";
//     getApiData(formData, url).then((output) => {
//       const data = output;

//       if (data.token) {
//         setcookies("authToken", output.token, { path: "/" });
//         setregData({
//           name: "",
//           email: "",
//           password: "",
//           phone: "",
//           mPassword: "",
//           username: "",
//           image: null,
//           dp: BlankDp,
//         });
//         setverifyEmailData({ ...verifyEmailData, email: regData.email });

//         history.push("/dashboard");
//       } else {
//         alert(data.Message);
//       }
//     });
//   };

//   const handleResetPasswordForm = (e, token) => {
//     e.preventDefault();
//     let formData = new FormData();
//     formData.append("token", token);
//     formData.append("password", rpdata.password);

//     let url = "http://localhost:9000/login/updatePassword";
//     getApiData(formData, url)
//       .then((output) => {
//         if (output.update) {
//           setrpMessage({
//             message: output.message,
//             display: "block",
//             loginDisplay: "inline-block",
//           });
//         } else {
//           setrpMessage({
//             message: output.message,
//             display: "block",
//             loginDisplay: "none",
//           });
//         }
//       })
//       .catch((error) => {
//         setrpMessage({
//           message: "something went wrong",
//           display: "block",
//           loginDisplay: "none",
//         });
//       });
//   };

//   const handleVerifyEmail = (e) => {
//     e.preventDefault();
//     let formData = new FormData();
//     let otp =
//       verifyEmailData.digit1 +
//       "" +
//       verifyEmailData.digit2 +
//       "" +
//       verifyEmailData.digit3 +
//       "" +
//       verifyEmailData.digit4 +
//       "" +
//       verifyEmailData.digit5 +
//       "" +
//       verifyEmailData.digit6;

//     formData.append("otpReceived", otp);
//     formData.append("token", cookies.authToken);
//     let url = "http://localhost:9000/login/otpVerify";
//     getApiData(formData, url)
//       .then((output) => {
//         console.log(output);
//         if (output.token) {
//           setcookies("authToken", output.token, { path: "/" });
//           history.push("/dashboard");
//         } else if (output.expired) {
//           setverifyEmailData({
//             display: "inline-block",
//             message: "You cant change otp as you are not authenticated",
//           });
//         } else {
//           setverifyEmailData({
//             display: "inline-block",
//             message: output.message,
//           });
//         }
//       })
//       .catch((error) => {
//         setverifyEmailData({ display: "inline-block", message: error.message });
//       });
//   };

//   const CheckIfLoggedin = () => {
//     if (cookies.authToken) {
//       try {
//         console.log(typeof process.env.REACT_APP_JWT_CODE);
//         jwt.verify(cookies.authToken, process.env.REACT_APP_JWT_CODE);

//         let decode = jwt.decode(cookies.authToken);
//         console.log(decode);
//         setauthTokenValues({
//           auth: decode.auth,
//           username: decode.username,
//           verified: decode.verified,
//         });
//       } catch (err) {
//         setauthTokenValues({
//           auth: false,
//           username: "",
//           verified: false,
//         });
//         history.push("/");
//       }
//     } else {
//       setauthTokenValues({
//         auth: false,
//         username: "",
//         verified: false,
//       });
//       history.push("/");
//     }
//   };

//   useEffect(() => {
//     CheckIfLoggedin();
//   }, [historyChanged, cookies.authToken]);

//   return (
//     <Router>
//       <Switch>
//         <div
//           className="home-container  background d-flex justify-content-center align-items-center overflow-auto"
//           style={{ backgroundImage: `url(${backImage})` }}
//         >
//           <section
//             className="home-view d-flex flex-column justify-content-center align-items-center"
//             style={{}}
//           >
//             <Route exact path="/" component={GetStarted} />

//             <Route exact path="/Login">
//               {authTokenValues.auth ? (
//                 <Redirect to="/dashboard" />
//               ) : (
//                 <Login
//                   LoginData={LoginData}
//                   setLoginData={setLoginData}
//                   LoginForm={LoginForm}
//                 />
//               )}
//             </Route>

//             <Route exact path="/Sign-up">
//               {authTokenValues.auth ? (
//                 <Redirect to="/dashboard" />
//               ) : (
//                 <Signup
//                   regData={regData}
//                   setregData={setregData}
//                   handleRegSubmit={HandleRegSubmit}
//                   getApiData={getApiData}
//                 />
//               )}
//             </Route>

//             <Route exact path="/Forgot-Password">
//               <ForgotPassword getApiData={getApiData} />
//             </Route>

//             <Route exact path="/verify-mail">
//               {authTokenValues.verified ? (
//                 <Redirect to="/Profile-Set" />
//               ) : (
//                 <MailVerify
//                   handleVerifyEmail={handleVerifyEmail}
//                   verifyEmailData={verifyEmailData}
//                   setverifyEmailData={setverifyEmailData}
//                 />
//               )}
//             </Route>

//             <Route exact path="/reset-password/:key">
//               {
//                 <ResetPass
//                   rpdata={rpdata}
//                   setrpdata={setrpdata}
//                   handleResetPasswordForm={handleResetPasswordForm}
//                   rpMessage={rpMessage}
//                 />
//               }
//             </Route>

//             <Route exact path="/Profile-Set">
//               {authTokenValues.username === " " ? (
//                 <ProfileSet
//                   regData={regData}
//                   setregData={setregData}
//                   token={cookies.authToken}
//                   setcookies={setcookies}
//                 />
//               ) : (
//                 <Redirect to="/dashboard" />
//               )}
//             </Route>

//             <Route path="/dashboard">
//               {isRegDetails() ? (
//                 <DashRouting />
//               ) : authTokenValues.verified ? (
//                 <Redirect to="/Profile-set" />
//               ) : (
//                 <Redirect to="/verify-mail" />
//               )}
//             </Route>
//           </section>
//         </div>
//       </Switch>
//     </Router>
//   );
// };

// export default App;

