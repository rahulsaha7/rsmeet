
const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Router = express.Router();
const reg = require('./public/components/Reg');
const login = require('./public/components/login');
const EmailCheck = require('./public/components/emailCheck');
const multer = require('multer');
const nodemailer = require('nodemailer');


const imageStorage = multer.diskStorage({
  // Destination to store image     
  destination: './src/public/images',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now()
      + (file.originalname))
    // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  }
});



const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 541435 // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      // upload only png and jpg format
      return cb(new Error('Please upload a Image'))
    }
    cb(undefined, true)
  }
})




Router.post('/',imageUpload.none(), (req, res) => {

  //If login is called then login will be called

  let data = JSON.parse(JSON.stringify(req.body));


  

  let {email,password} = data;


  login.loginFunc(email,password).then((output)=>{
    console.log(output);
    res.json(output);

  }).catch((error)=>{
      res.send(error);
  })



});

Router.post('/r',imageUpload.none(),(req, res) => {



  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);




  //imageUpload.single('image')

  //this will give me a proper data 

  let data = JSON.parse(JSON.stringify(req.body));


  //now question arrises that whether should I add all at once or


  //

  console.log(data)
  reg.regis(data.name, data.email, data.phone, data.password).then((output) => {
    //Before sending output I have to create a user folder with username 
    //And make sure that user name is unique
    res.json(output);

  }).catch((error) => {
    res.json({
      'error': true,
      'Emessage': error.message
    })
  })




});



Router.post('/check', imageUpload.none(), (req, res) => {
  let data = JSON.parse(JSON.stringify(req.body));


  EmailCheck.Echeck(data.email).then((output) => {
    res.json(output);
  }).catch((error) => {
    res.json({
      'error': true,
      'Emessage': error.message
    })
  })
});

Router.post('/authCred',imageUpload.none(),(req,res)=>{
 let status = true;
 let data = false;
 let cookie = false;
 if(req.cookies){
    cookie = true;
    data = req.cookies;
}

res.json({
  'status' : status,
  'data':data,
  'cookie':cookie
})

});


Router.post('/sendMail',imageUpload.none(),(req,res)=>{


  let data = JSON.parse(JSON.stringify(req.body));
 let {email} = data;

 console.log(email);

 let status = true;
 let error = false;
 let message='mail will be sent if mail id exist';

 //But before intializing this, lets check whether mail exist or not 


EmailCheck.Echeck(email).then((output)=>{
  
  if(output.exist){
    const transporter = nodemailer.createTransport({
      port : 465,
      host : 'smtp.gmail.com',
      auth : {
        user : 'rsahagdrive@gmail.com',
        pass : 'shinchan7242', 
      },
      secure : true,
   });
  
   const mailData = {
     from : 'rsahagdrive@gmail.com',
     to : email,
     subject : 'testing mail services using nodemailer',
     text : 'Lets see what happens',
     html : '<b>Link for forgot password</b> <a herf = "#"> link will be here </a>',
   };

   transporter.sendMail(mailData);
   

  }
}).catch((error)=>{
  error = true;
  message = err.message;
})

console.log(message);

  res.json({
            'status':status,
            'error':error,
            'message':message
   });


});


module.exports = Router;