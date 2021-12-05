const path = require('path');
const fs = require('fs');
const process = require('process')
const app = require('express');
const cookieParser = require('cookie-parser');
const express = app();
var cors = require('cors');
const login = require('./src/indexLogin');
const msg = require('./src/public/components/UpdateMessageList');
const server = require('http').createServer(express);
const io = require('socket.io')(server,{
    
        cors: {
          origin: "*",
        }
});








const port = process.env.PORT || 9000
express.use(cors({credentials: true, origin: true}));
express.use(cookieParser());




express.use(app.json());
express.use(app.urlencoded({extended:false}));






 

express.use('/login',login);
express.use('/login/r',login);


io.on("connection",(socket)=>{
    socket.on("rsmeet",(payload)=>{
        //Upload to daatabase;
       
        msg.message(payload).then((output)=>{
           // console.log(typeof(payload));
            
            io.emit("newMsg",{output,payload});
        })
        
        
        
    });


  


  

    
    
})




//express.listen(port);
server.listen(port,()=>{
    console.log(`Server is running at port ${port}...`);
});