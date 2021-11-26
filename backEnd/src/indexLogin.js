const express = require("express");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const fs = require('fs');
const Router = express.Router();
const reg = require("./public/components/Reg");
const login = require("./public/components/login");
const EmailCheck = require("./public/components/emailCheck");
const updatePass = require("./public/components/updatePass");
const checkuser = require("./public/components/checkUsername");
const upuser = require('./public/components/updateUsername');
const multer = require("multer");
const jwt = require("jsonwebtoken");
const mailSend = require("./public/components/sendMail");

const verifyotp = require("./public/components/verifyOtp");




const imageStorage = multer.diskStorage({
  // Destination to store image
  destination: "./src/public/temp",
  filename: (req, file, cb) => {
  let   ProfileImage = file.fieldname + "_" + Date.now() + file.originalname;

    cb(null,ProfileImage);
    // file.fieldname is name of the field (image)

  },
});

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 541435, // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      // upload only png, jpg and jpeg format  format
      return cb(new Error("Please upload a Image"));
    }
    cb(undefined, true);
  },
});

Router.post("/", imageUpload.none(), (req, res) => {
  //If login is called then login will be called

  let data = JSON.parse(JSON.stringify(req.body));

  let { email, password } = data;

  login
    .loginFunc(email, password)
    .then((output) => {
     
      res.json(output);
    })
    .catch((error) => {
      res.send(error);
    });
});

Router.post("/r", imageUpload.none(), (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);

  //imageUpload.single('image')

  //this will give me a proper data

  let data = JSON.parse(JSON.stringify(req.body));

  //now question arrises that whether should I add all at once or

  //


  reg
    .regis(data.name, data.email, data.phone, data.password)
    .then((output) => {
      //Before sending output I have to create a user folder with username
      //And make sure that user name is unique
      res.json(output);
    })
    .catch((error) => {
      res.json({
        error: true,
        Emessage: error.message,
      });
    });
});

Router.post("/check", imageUpload.none(), (req, res) => {
  let data = JSON.parse(JSON.stringify(req.body));

  EmailCheck.Echeck(data.email)
    .then((output) => {
      res.json(output);
    })
    .catch((error) => {
      res.json({
        error: true,
        Emessage: error.message,
      });
    });
});

Router.post("/authCred", imageUpload.none(), (req, res) => {
  let status = true;
  let data = false;
  let cookie = false;
  if (req.cookies) {
    cookie = true;
    data = req.cookies;
  }

  res.json({
    status: status,
    data: data,
    cookie: cookie,
  });
});

Router.post("/sendMail", imageUpload.none(), (req, res) => {
  let data = JSON.parse(JSON.stringify(req.body));
  let { email } = data;

  let status = true;
  let error = false;
  let message = "mail will be sent if mail id exist";

  //But before intializing this, lets check whether mail exist or not

  EmailCheck.Echeck(email)
    .then((output) => {
      if (output.exist) {
        let host = "smtp.gmail.com";
        let port = 465;
        let subject = "Reset password request";
        let user = "rsahagdrive@gmail.com";
        let password = "shinchan7242";

        let token = jwt.sign(
          {
            sub: "ResetId",

            userID: output.data,
          },
          "ResetPasswordJWT",
          { algorithm: "HS256", expiresIn: "900s" }
        );

        let link = `http://localhost:3000/reset-password/${token}`;

        let html = `<b> link is here <br> ${link}   and will be valid only for 15 mintues <b/>`;

        let text = "Alternative text will be here";

       

        mailSend.sendMailFunc(
          email,
          subject,
          user,
          password,
          host,
          port,
          text,
          html
        );
      }
    })
    .catch((error) => {
      error = true;
      message = error.message;
    });



  res.json({
    status: status,
    error: error,
    message: message,
  });
});

Router.post("/verifyToken", imageUpload.none(), (req, res) => {
  let valid = true;
  let expire = false;
  let Jwterror = false;
  let message = "";
  let data = JSON.parse(JSON.stringify(req.body));

  let { token } = data;
  try {
    jwt.verify(token, "ResetPasswordJWT");
    message = "jwt valid";
  } catch (er) {
    valid = false;
    if (er.message === "jwt expired") expire = true;
    else Jwterror = true;
    message = er.message;
  } finally {
    res.json({
      valid: valid,
      expire: expire,
      error: Jwterror,
      message: message,
    });
  }
});

Router.post("/updatePassword", imageUpload.none(), (req, res) => {
  let data = JSON.parse(JSON.stringify(req.body));
  let { token, password } = data;
  updatePass.updatePass(token, password).then((output) => {
   
    res.json(output);
  });
});

Router.post("/otpVerify", imageUpload.none(), (req, res) => {
  let data = JSON.parse(JSON.stringify(req.body));
  let { token, otp } = data;
  try {
    jwt.verify(token, "authJWT");
    let decode = jwt.decode(token);
    verifyotp.verotp(decode.userID, otp).then((output) => {
      if (output.otpMatched) {
        token = jwt.sign(
          {
            sub: "Auth JWT",
            auth: true,
            userID: decode.userID,
            verified: true,
            username: " ",
          },
          "authJWT",
          { algorithm: "HS256",expiresIn:"1d" }
        );
        res.json({
          token: token,
        });
      } else {
        res.json(output);
      }
    });
  } catch (err) {
    res.json({
      expired: true,
    });
  }
});

Router.post("/checkUsername", imageUpload.none(), (req, res) => {
  let data = JSON.parse(JSON.stringify(req.body));
  let { username } = data;
  checkuser.checkU(username).then((output)=>{
      res.json(output);
  }).catch((error)=>{
    res.json({
      'error':true
    })
  })
});

Router.post('/ProfileSet',imageUpload.single('image'),(req,res)=>{
  
   let data = JSON.parse(JSON.stringify(req.body));
  
  let tokenR = data.token;
  let decode = jwt.decode(tokenR);

  //copy dp from image temp to dynamic folder
 
 

  fs.copyFile(`${req.file.path}`,`./src/public/${decode.userID}/images/${req.file.filename}`,(err)=>{
    if(err){
       
    }else{

       //then remove the old file
       fs.unlinkSync(`./${req.file.path}`);
       //Then add username to database and update new jwt
      
        upuser.updateU(data.username,decode.userID,`./src/public/${decode.userID}/images/${req.file.filename}`).then((output)=>{
          
          if(output.updated){
              //Create a token and return it with a message
           
            let  token = jwt.sign(
                {
                  sub: "Auth JWT",
                  auth: true,
                  userID: decode.userID,
                  verified: true,
                  username: data.username,
                  image:`./src/public/${decode.userID}/images/${req.file.filename}`,
                },
                "authJWT",
                { algorithm: "HS256",expiresIn:"1d" }
              );

             
              res.json({
                'token' : token,
                'updated':output.updated
              })
              

          }else{
            //return error with a message 
            res.json({
              'updated':false,
              "message":"Couldn't find the username"
            })
          }
        }).catch((err)=>{
            //return error with something went wrong while updating the username
            res.json({
              'error':true,
              'message':err.message
            })
        });



    }
  });

});
 
  //then call a file that will upload username to db and update new token

module.exports = Router;
