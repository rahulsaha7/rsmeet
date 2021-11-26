const express = require('express');
const mongoose = require('mongoose');
const Schemas = require('../db/dbSchemas');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
mongoose.connect('mongodb://localhost/chatApplication');

const updatePass = async (token,password) =>{
    let status = true;
    let update = true;
    let error = false;
    let message;
    let result;

    const salt = bcrypt.genSaltSync(10);
    const hashp = bcrypt.hashSync(password, salt);

    let decode = jwt.decode(token);
    let id = decode.userID;


    try{
        let docs = await Schemas.schemaA.update.findOneAndUpdate({_id:id},
            {password:hashp});  
        if(docs){
           
            message = 'update Successfull';
            //After successfull event. invalid the jwt token

        }else{
            message = "user not exist";
            update = false;
        }

    }catch(err){
        error = true;
        message = err.message;
    }finally{
        result = {
            'status':status,
            'update':update,
            'error':error,
            'message':message,
        };
        return result;
    }

} 

module.exports.updatePass = updatePass;