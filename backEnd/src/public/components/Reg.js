const crypto = require("crypto");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schemas = require("../db/dbSchemas");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const fs = require("fs");
const path = require('path');



mongoose.connect("mongodb://localhost/chatApplication");

//

const createFileStructure = (id) => {
    let dir = path.join(__dirname,'..',id);

    console.log(dir);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    dir = path.join(dir,'images');
    console.log(dir);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
}

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
      const id = crypto.randomBytes(12).toString("hex");
      const salt = bcrypt.genSaltSync(10);
      const hashp = bcrypt.hashSync(password, salt);
      const regDetails = {
        _id: id,
        name: nameUSER,
        email: email,
        phone: phone,
        password: hashp,
      };

      const respone = await Schemas.schemaA.register.create(regDetails);

      message = "Registration Successfull";
      token = jwt.sign(
        {
          sub: "Auth JWT",
          auth: true,
          userID: id,
          verified: false,
          username: "none",
        },
        "authJWT",
        { algorithm: "HS256" }
      );
    //   response.cookie("jwtAuth", token, {
    //     maxAge: 24 * 60 * 60 * 1000,
    //     httpOnly: true,
    //   });

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

//0ERaAydX2j
//CkPmhRmMuU

// defined('DB_HOST')? NULL : define('DB_HOST','https://remotemysql.com');
// defined('DB_USER')? NULL : define('DB_USER','0ERaAydX2j');
// defined('DB_PASS')? NULL : define('DB_PASS','CkPmhRmMuU');
// defined('DB_NAME')? NULL : define('DB_NAME','0ERaAydX2j');
