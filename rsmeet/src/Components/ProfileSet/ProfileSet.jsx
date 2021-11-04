import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { BsArrowRight } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import axios from "axios";
import FormData from "form-data";
import "./ProfileSet.css";

const ProfileSet = ({ regData, setregData }) => {
  const [err, seterr] = useState({
    errDisplay: "none",
    errMessage: "Size should be less then 500kb",
  });

  const uploadHandler = (event) => {
    if (event.target.files[0].size > 541435) {
      seterr({ ...err, errDisplay: "inline" });
    } else {
      //Only image data and username will be push to useState variable

      //But first lets check Signup.jsx file

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

  const callRegistrationApi = () => {
    //Find a more elegent way to return param and create a file called api
    //Where you will send data as well as url and everything will be returned

    const formData = new FormData();
    formData.append("username", regData.username);
    formData.append("name", regData.name);
    formData.append("email", regData.email);
    formData.append("password", regData.password);
    formData.append("phone", regData.phone);
    formData.append("image", regData.image[0], regData.image[0].name);

    axios
      .post("http://localhost:9000/login/r", formData, {
        headers: {
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const { data } = res;
        console.log({ data });
      })
      .catch((err) => {
        console.log(err);
      });

    // axios.post('http://localhost:9000/login/r',{

    // params:{
    //     name:regData.name,
    //     email:regData.email,
    //     password:regData.password,
    //     username:regData.username,
    //     phone:regData.phone,
    //     image:regData.image

    // },
    // headers:{
    //     "Content-Type": "multipart/form-data"
    // }
    // }).then((output)=>{
    //     const {data} = output;
    //     console.log(data);

    // }).catch((error)=>{
    //     console.log(error);
    // })
  };

  const checkData = (e) => {
    e.preventDefault();
    console.log(regData);
    callRegistrationApi();
  };

  const ProfileUploader = useRef(null);

  useEffect(() => {
    // effect
    // return () => {
    //     cleanup
    // }
    //Everytime reg data changes , specially user name will change, this effect will be called to backend to check whether username is alrady taken or not
  }, []);

  return (
    <>
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
            <img
              src={regData.dp}
              alt="BlankDp to visualize user for chooseing Profile Picture"
            />
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
    </>
  );
};

export default ProfileSet;
