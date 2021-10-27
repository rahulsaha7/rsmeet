const path = require('path');
const process = require('process')
const app = require('express');
const express = app();
//const bodyParser = require('body-parser');
var cors = require('cors');
const login = require('./src/indexLogin');

//const { json, urlencoded } = require('body-parser');
// const multer = require('multer');






const port = process.env.PORT || 9000
express.use(cors({credentials: true, origin: true}));


// express.use(bodyParser.urlencoded({extended:true}));
// express.use(bodyParser.json());
//   express.use(upload.array());

express.use(app.json());
express.use(app.urlencoded({extended:false}));



//This line is very very important 



 

express.use('/login',login);
express.use('/login/r',login);


express.listen(port);