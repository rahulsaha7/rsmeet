const path = require('path');
const process = require('process')
const app = require('express');
const express = app();
const bodyParser = require('body-parser');
const multer = require('multer');
const login = require('./src/indexLogin');
const upload = multer();

const port = process.env.PORT || 9000



express.use(bodyParser.urlencoded({extended:true}));
express.use(bodyParser.json());
express.use(upload.array());


 

express.use('/login',login);
express.use('/login/r',login);


express.listen(port);