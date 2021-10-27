const crypto = require('crypto');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schemas = require('../db/dbSchemas');

mongoose.connect('mongodb://localhost/chatApplication');




const Register = async (nameUSER, email, phone, password) => {



    let status = true;
    let exist = false;
    let error = false;
    let message;
    let result;






    try {
        const docs = await Schemas.schemaA.register.find({ email: email });
        if (docs.length) {
            message = "Username already exixst";
            exist = true;
        } else {
            const id = crypto.randomBytes(12).toString('hex');
            const salt = bcrypt.genSaltSync(10);
            const hashp = bcrypt.hashSync(password, salt);
            const regDetails = {
                _id: id,
                name: nameUSER,
                email: email,
                phone: phone,
                password: hashp,
                mailVerified:false
            };


            const respone = await Schemas.schemaA.register.create(regDetails);

            message = 'Registration Successfull';
            //data will be taoken with user id, image, username
        }
    } catch (err) {

        message = err.message;
    } finally {
        result = {
            'status': status,
            'error': error,
            'exist': exist,
            'Message': message
        }
        return result;
    }


};

module.exports.regis = Register;