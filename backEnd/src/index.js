const path = require('path');
const process = require('process')
const app = require('express');
const express = app();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

express.use(bodyParser.urlencoded({extended:true}));
express.use(bodyParser.json());
express.use(upload.array());

const port = process.env.PORT || 9000 


//here everything will be written


express.listen(port);