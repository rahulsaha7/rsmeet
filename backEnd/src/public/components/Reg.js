const crypto = require("crypto");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schemas = require("../db/dbSchemas");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const fs = require("fs");
const path = require("path");
const mailSend = require("./sendMail");

mongoose.connect("mongodb://localhost/chatApplication");

//

const createFileStructure = (id) => {
  let dir = path.join(__dirname, "..", id);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  dir = path.join(dir, "images");

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const Register = async (nameUSER, email, phone, password) => {
  let status = true;
  let exist = false;
  let error = false;
  let message;
  let result;
  let token = "";

  try {
    const docs = await Schemas.schemaA.register.find({ email: email });
    if (docs.length) {
      message = "Username already exixst";
      exist = true;
    } else {
      var today = new Date();
      let h = today.getHours();
      let m = today.getMinutes();
      let d = today.getDate();
      let mo = today.getMonth();
      mo += 1;
      let date = d + "/" + mo + " " + h + ":" + m;
      const id = crypto.randomBytes(12).toString("hex");
      const salt = bcrypt.genSaltSync(10);
      const hashp = bcrypt.hashSync(password, salt);
      let otp = Math.floor(100000 + Math.random() * 900000);
      let timeinSec = Math.floor(Date.now() / 1000);
      const regDetails = {
        _id: id,
        name: nameUSER,
        email: email,
        phone: phone,
        password: hashp,
        otp: otp,
        otpvTime: timeinSec,
        status: {
          status: true,
          last: date,
        },
      };

      let host = "smtp.gmail.com";
      let port = 465;
      let subject = "Mail Verification from Rsmeet";
      let user = "rsahagdrive@gmail.com";
      let Emailpassword = "Shinchan7242";

      let html = `<b> Otp is here <br> ${otp}   and will be valid only for 15 mintues <b/>`;

      let text = "Alternative text will be here";

      const respone = await Schemas.schemaA.register.create(regDetails);

      message = "Registration Successfull";
      let response2 = Schemas.schemaA.conve.create({
        userID: id,
        message: [],
        pMessage: [],
        blockList: [],
        deleteList: [],
      });
      token = jwt.sign(
        {
          sub: "Auth JWT",
          auth: true,
          userID: id,
          verified: false,
          username: " ",
        },
        "authJWT",
        { algorithm: "HS256" }
      );
      //   response.cookie("jwtAuth", token, {
      //     maxAge: 24 * 60 * 60 * 1000,
      //     httpOnly: true,
      //   });

      mailSend.sendMailFunc(
        email,
        subject,
        user,
        Emailpassword,
        host,
        port,
        text,
        html
      );

      //Send mail with 6 digit otp with validity of 15mintus only

      //If again send mail is send then update databse with new otp and validity will be reset to 15mint again

      createFileStructure(id);
    }
  } catch (err) {
    message = err.message;
  } finally {
    result = {
      status: status,
      error: error,
      exist: exist,
      token: token,
      Message: message,
    };
    return result;
  }
};

module.exports.regis = Register;
