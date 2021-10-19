
const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Router = express.Router();
const reg = require('./public/components/Reg');


Router.post('/',(req,res)=>{
    
   //If login is called then login will be called
  
});

Router.post('/r',(req,res)=>{
    //If reg is called then reg will be called 
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    let password = req.body.password;
    reg.regis(name,email,phone,password).then((output)=>{
        if(output['_message'])
            res.send(output['_message']);
        else
        res.send("Registration Successfull");
    })
  
    
});

module.exports = Router;