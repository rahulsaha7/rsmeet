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
    console.log('socket is activated to connect');
    socket.on("rsmeet",(payload)=>{
        //Upload to daatabase;
       
        msg.message(payload).then((output)=>{
           
            io.emit("newMsg",output);
        })
        
        //  io.emit("newMsg",data);
        
        
    });


    // socket.on("updated",(payload)=>{
    //     io.emit('CheckMsg',payload);
    // })



    // socket.on('join',(payload)=>{
    //     socket.join(payload.author);
       
    // })


    socket.on('create', (payload)=> {
        // socket.join(payload.room);
        
        socket.join(payload.receiver);
        // socket.broadcast.to(payload.withUserId).emit("invite",payload)
        io.emit('invite',payload);
    });

    socket.on('joinRoom', (payload) => {
        
         socket.join(payload.reciever);
        // io.to(data.receiver).emit('message',data);
        
        io.sockets.in(payload.receiver).emit('new_msg',payload.body);
    });

    
    
})




//express.listen(port);
server.listen(port,()=>{
    console.log(`Server is running at port ${port}...`);
});