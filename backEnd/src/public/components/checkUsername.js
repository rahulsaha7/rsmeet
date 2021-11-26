const express = require('express');
const mongoose = require('mongoose');
const Schemas = require('../db/dbSchemas');


mongoose.connect('mongodb://localhost/chatApplication');

const check = async (username) =>{
    let exist = false;
    let error = false
    try{
        const docs = await Schemas.schemaA.register.find({username:username}); 
        if(docs.length){
            exist=true;
        }
    }catch(err){
        error=true;
    }finally{
        let result = {
            'exist':exist,
            'error':error
        }
        return result;
    }
}

module.exports.checkU = check;