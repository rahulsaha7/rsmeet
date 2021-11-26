const crypto = require("crypto");
const express = require("express");
const mongoose = require("mongoose");

const Schemas = require("../db/dbSchemas");
const jwt = require("jsonwebtoken");
const { response } = require("express");

const verifyOtp = async (id,otp) =>{
    let otpMatched = false;
    let error = false;
    let exist = true;
    let message = "";
    let result;
    try{
    let docs = await Schemas.schemaA.update.find({_id:id});
        if(docs.length){
           if(otp === docs[0].otp){
            let docs = await Schemas.schemaA.register.findOneAndUpdate({_id:id},
                {mailVerified:true});  
            if(docs){
               
                otpMatched = true;
    
            }else{
                message = "Somwthing went wrong";
                error  =true;
                
            }
              
           }else{
               message="Invalid Otp";
           }

        }else{
            exist = false;
            message = "Can't find the user";
            
        }
    }catch(err){
        error = true;
    }finally{
        result = {
            'otpMatched':otpMatched,
            'error':error,
            'exist':exist,
            'message':message,
        }
        return result;
    }
}

module.exports.verotp = verifyOtp;