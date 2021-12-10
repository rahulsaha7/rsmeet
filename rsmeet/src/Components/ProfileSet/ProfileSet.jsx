import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "../Header/Header";
import { BsArrowRight } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import FormData from "form-data";
import { getApiData } from "../../apis/api";
import "./ProfileSet.css";
import Jwt from "jsonwebtoken";

const ProfileSet = ({ regData, setregData, setauthTokenValues }) => {
  const [err, seterr] = useState({
    errDisplay: "none",
    errMessage: "Size should be less then 500kb",
  });

  const [usernameExist, setusernameExist] = useState({
    display: "none",
    message: "",
  });

  let history = useHistory();

  const uploadHandler = (event) => {
    if (event.target.files[0].size > 541435) {
      seterr({ ...err, errDisplay: "inline" });
    } else {
      setregData({
        name: regData.name,
        email: regData.email,
        password: regData.password,
        mPassword: regData.mPassword,
        username: regData.username,
        phone: regData.phone,
        image: event.target.files,
        dp: URL.createObjectURL(event.target.files[0]),
      });
      seterr({ ...err, errDisplay: "none" });
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const callRegistrationApi = () => {
    let result = "";
    const formData = new FormData();
    formData.append("username", regData.username);

    formData.append("token", localStorage.getItem("authToken"));
    if (regData.image === null) {
      formData.append("image", "");
    } else {
      let image = regData.image[0];

      let promise = getBase64(image);
      promise.then((result) => {
        formData.append("image", result);
        let url = "http://localhost:9000/login/ProfileSet";
        getApiData(formData, url)
          .then((res) => {
            if (res.updated) {
              localStorage.setItem("authToken", res.token);
              Jwt.verify(res.token, process.env.REACT_APP_JWT_CODE);

              let decode2 = Jwt.decode(res.token);
              setauthTokenValues({
                auth: decode2.auth,
                username: decode2.username,
                verified: decode2.verified,
              });
              history.push(`/dashboard/home/${decode2.username}`);
            } else if (!res.updated) {
              alert(res.message);
            }
          })
          .catch((err) => {
            alert("something went wrong");
          });
      });
    }
  };

  const checkData = (e) => {
    e.preventDefault();

    callRegistrationApi();
  };

  const ProfileUploader = useRef(null);

  const CheckUsername = () => {
    let formData = new FormData();
    formData.append("username", regData.username);
    let url = "http://localhost:9000/login/checkUsername";
    getApiData(formData, url)
      .then((output) => {
        // console.log(output);
        if (output.exist) {
          setusernameExist({
            display: "inline-block",
            message: "username is already taken",
          });
        } else {
          setusernameExist({
            display: "none",
            message: "username is already taken",
          });
        }
      })
      .catch((error) => {
        setusernameExist({
          display: "inline-block",
          message: "Something went wrong",
        });
      });
  };

  useEffect(() => {
    CheckUsername();
  }, [regData.username]);

  return (
    <div className="p-4">
      <Header haderTitle="Set Profile" height="100px" width="100px" />

      <form
        className="w-100"
        action=""
        method="POST"
        encType="multipart/form-data"
        onSubmit={(e) => checkData(e)}
      >
        <section className="profileImage w-100 d-flex justify-content-center mt-3 p-2">
          <figure>
            <img src={regData.dp} alt="BlankDp" />
            <input
              type="file"
              hidden
              name=""
              id=" "
              accept=".png,.jpg,.jpeg | image/*"
              onInput={(event) => {
                event.target.setCustomValidity("");
              }}
              ref={ProfileUploader}
              onChange={(event) => {
                uploadHandler(event);
              }}
              // required
              // onInvalid={(e) => {
              //   e.target.setCustomValidity(alert("hey upload image"));
              // }}
            />
          </figure>

          <figure
            className="edit"
            onClick={() => ProfileUploader.current.click()}
          >
            <span className="d-inline">
              <MdModeEdit />
            </span>
          </figure>
        </section>

        <span style={{ color: "RED", display: err.errDisplay }}>
          {" "}
          {err.errMessage}{" "}
        </span>

        <section className=" mt-3">
          <label className="form-label" htmlFor="username">
            username
          </label>
          <div className="usernameHolder p-3 d-flex justify-content-center">
            <input
              className="form-control"
              type="text"
              name="userName"
              id="username"
              placeholder="Please Choose a username"
              value={regData.username}
              onChange={(event) => {
                setregData({ ...regData, username: event.target.value });
              }}
              pattern="^[a-zA-Z0-9_@-]+$"
              onInvalid={(e) => {
                e.target.setCustomValidity(
                  "only aphnumeric characters with @,_,-  are allowed"
                );
              }}
              onInput={(e) => {
                e.target.setCustomValidity("");
              }}
              autoComplete="off"
              required=" "
            />
          </div>
        </section>

        <span style={{ color: "red", display: usernameExist.display }}>
          {" "}
          {usernameExist.message}{" "}
        </span>

        <section className="w-100 " style={{ textAlign: "right" }}>
          <button className="py-2 px-3 signInButton mt-3" type="submit">
            {" "}
            <span style={{ color: "white" }}>
              {" "}
              Dashboard <BsArrowRight color="black" />
            </span>{" "}
          </button>
        </section>
      </form>
    </div>
  );
};

export default ProfileSet;
