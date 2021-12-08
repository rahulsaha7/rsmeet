import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import { AiFillEye } from "react-icons/ai";
import { getApiData } from "../../apis/api.js";
import { Link, useHistory, useParams } from "react-router-dom";

const ResetPass = ({
  rpdata,
  setrpdata,
  handleResetPasswordForm,
  rpMessage,
}) => {
  const [viewPass, setviewPass] = useState("password");
  const [pdisplay, setpdisplay] = useState("none");

  const [passMatched, setpassMatched] = useState({
    mPdisplay: "none",
    mPmessage: "Password not matched with the password you have entered",
    button: false,
  });

  const { key } = useParams();
  const history = useHistory();

  const CheckKey = () => {
    let formData = new FormData();
    formData.append("token", key);

    let url = "http://localhost:9000/login/verifyToken";

    getApiData(formData, url)
      .then((output) => {
        if (!output.valid) {
          history.push("/Forgot-Password");
        }
      })
      .catch((error) => {
        history.push("/Forgot-Password");
      });
  };

  useEffect(() => {
    CheckKey();
  }, [key]);

  return (
    <div className="p-4">
      <Header haderTitle="Reset Password" height="100px" width="100px" />
      <form
        action=""
        method="post"
        onSubmit={(e) => handleResetPasswordForm(e, key)}
      >
        <section className=" mt-3 ">
          <label className="form-label" htmlFor="password">
            password
          </label>
          <div className="passwordHolder p-3 d-flex justify-content-center">
            <input
              className="form-control"
              onInput={(e) => {
                e.target.setCustomValidity("");
              }}
              onFocus={() => {
                setpdisplay("block");
              }}
              onBlur={() => {
                setpdisplay("none");
              }}
              type={viewPass}
              name="password"
              id="password"
              placeholder="password"
              value={rpdata.password}
              onChange={(event) => {
                setrpdata({ ...rpdata, password: event.target.value });
              }}
              autoComplete="off"
              required=" "
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^\*]).{8,}"
              onInvalid={(e) => {
                e.target.setCustomValidity("Please enter correct combination");
              }}
            />
            <span
              style={{ color: "white", alignSelf: "center" }}
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

          <div style={{ display: pdisplay }}>
            <ul>
              <li style={{ color: "white" }}>
                The string must contain at least 1 lowercase alphabetical
                character{" "}
              </li>
              <li style={{ color: "white" }}>
                The string must contain at least 1 uppercase alphabetical
                character
              </li>
              <li style={{ color: "white" }}>
                The string must containt at least 1 special character
              </li>
              <li style={{ color: "white" }}>
                The string must contain at least 1 numeric character
              </li>
            </ul>
          </div>
        </section>

        <section className=" mt-3">
          <label className="form-label" htmlFor="m-password">
            Match Password
          </label>
          <div className="usernameHolder p-3 d-flex justify-content-center">
            <input
              className="form-control"
              onInput={(e) => {
                e.target.setCustomValidity("");
              }}
              type="text"
              name="m-password"
              id="m-password"
              onBlur={(event) => {
                rpdata.password === rpdata.mPassword
                  ? setpassMatched({ ...rpdata, mPdisplay: "none" })
                  : setpassMatched({
                      mPdisplay: "block",
                      mPmessage: "Password Missmatched",
                      button: true,
                    });
              }}
              value={rpdata.mPassword}
              onChange={(event) => {
                setrpdata({ ...rpdata, mPassword: event.target.value });
              }}
              placeholder="Match Password"
              autoComplete="off"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^\*]).{8,}"
              onInvalid={(e) => {
                e.target.setCustomValidity("Please enter correct combination");
              }}
              required=" "
            />
          </div>

          <div style={{ display: passMatched.mPdisplay }}>
            <ul className="mt-2">
              <li style={{ color: "red" }}>{passMatched.mPmessage}</li>
            </ul>
          </div>
        </section>

        <section className="w-100 " style={{ textAlign: "center" }}>
          <button
            className="py-2 px-3 signInButton mt-3"
            type="submit"
            disabled={passMatched.button}
          >
            <span style={{ color: "white" }}> Reset </span>
          </button>
        </section>

        <p style={{ display: rpMessage.display }}>
          {rpMessage.message}
          <span style={{ display: rpMessage.loginDisplay }}>
            <Link to="/Login" style={{ color: "rgb(62, 236, 90)" }}>
              . Sign In{" "}
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default ResetPass;
