const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schemas = require('../db/dbSchemas');
const jwt = require('jsonwebtoken');
const { response } = require('express');

mongoose.connect('mongodb://localhost/chatApplication');


const login = async (email,password) =>{

    let status = true;
    let exist = true;
    let error = false;
    let message;
    let result;
    let token="";

    console.log(password);


    try {
        const docs = await Schemas.schemaA.register.find({ email: email });
        if (docs.length) {
            

            


           

            

            let {_id,username,mailVerfied,image} = docs[0];

            
            let hash = docs[0].password;

            

            if (bcrypt.compareSync(password,hash)){
                
                //Create a jwt token

                

                token = jwt.sign({ sub: 'Auth JWT', 'auth': true, 'userID': _id, 'verified': mailVerfied, "username": username, 'image' : image },'authJWT',{ algorithm: 'HS256' });

                message = "Login Successfull";

            }else{
                message = 'either password or email is missmatched';
            }

            



        } else {

            message = "Username not exist";
            exist = false;

           
        }
    } catch (err) {
        error = true;
        message = err.message;
    } finally {
       
        result = {
            'status': status,
            'error': error,
            'exist': exist,
            'Message': message,
            'token' : token
        }
        return result;
    }


}

module.exports.loginFunc = login;