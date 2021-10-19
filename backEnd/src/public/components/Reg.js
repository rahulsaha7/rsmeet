const crypto = require('crypto');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schemas = require('../db/dbSchemas');

mongoose.connect('mongodb://localhost/chatApplication');




const Register = async (nameUSER,email,phone,password) =>{







        userFind(email).then((checkValue)=>{
            console.log(checkValue);
        })  
        
        const docs = await Schemas.schemaA.register.find({email:email});

       //if docs.length is true then return false and means that user data isn already exixsted on database 
     


    const id = crypto.randomBytes(12).toString('hex');
    const salt = bcrypt.genSaltSync(10);
    const hashp = bcrypt.hashSync(password, salt);
    const regDetails = {
        _id:id,
        name:nameUSER,
        email:email,
        phone:phone,   
        password:hashp
    };
    
    try{
        const   respone = await Schemas.schemaA.register.create(regDetails);    
        return respone;
    }catch(err){
        return err;
    }

    
};

module.exports.regis = Register;