const express = require('express');
const mongoose = require('mongoose');
const Schemas = require('../db/dbSchemas');


mongoose.connect('mongodb://localhost/chatApplication');

const emailCheck = async (email) =>{
    let status = true;
    let exist = false;
    let error = false;
    let message;
    let result;






    try{
        const docs = await Schemas.schemaA.dupUser.find({email:email});    
        if(docs.length){
            message = "email already exist";
            exist = true;
        }else{
            message = "email not exist";
            exist = false;
        }

    }catch(err){
        error = true;
        message = err.message;
    }finally{
        result = {
            'status':status,
            'exist':exist,
            'error':error,
            'message':message
        };
        return result;
    }

} 

module.exports.Echeck = emailCheck;