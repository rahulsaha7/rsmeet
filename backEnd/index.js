const path = require('path');
const process = require('process')
const app = require('express');
const cookieParser = require('cookie-parser');
const express = app();
var cors = require('cors');
const login = require('./src/indexLogin');
const server = require('http').createServer(express);
const io = require('socket.io')(server);








const port = process.env.PORT || 9000
express.use(cors({credentials: true, origin: true}));
express.use(cookieParser());




express.use(app.json());
express.use(app.urlencoded({extended:false}));






 

express.use('/login',login);
express.use('/login/r',login);


//express.listen(port);
server.listen(port,()=>{
    console.log(`Server is running at port ${port}...`);
});