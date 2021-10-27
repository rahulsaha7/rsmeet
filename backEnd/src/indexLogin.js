
const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Router = express.Router();
const reg = require('./public/components/Reg');
const EmailCheck = require('./public/components/emailCheck');
const multer = require('multer');


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




Router.post('/', (req, res) => {

  //If login is called then login will be called

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


module.exports = Router;