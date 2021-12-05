const express = require('express');
const mongoose = require('mongoose');
const Schemas = require('../db/dbSchemas');

mongoose.connect('mongodb://localhost/chatApplication');

const messageList = async (payload) =>{
    let userid;
    let encrypter;
    let data;
    let username="";
    let chats={};
    let {type} = payload;
    let updated;
    if(type="ps"){
        encrypter = payload.encrypter;
    }else{
        userid = payload.reciever
    }
    try{

       
        chats = {
            'body':payload.body,
            'author':payload.author,
            'time':payload.time,
            'receiver':payload.reciever,
            'msgId':payload.msgId
        }
        

        let docs;
        
        if(payload.type==="ps"){
            docs = await Schemas.schemaA.conve.findOneAndUpdate(
                { userID: payload.reciever }, 
                { $push: { pMessage: chats } },{new:true});
        
        }else if(payload.type=="nt"){
             docs = await Schemas.schemaA.conve.findOneAndUpdate(
                { userID: payload.reciever }, 
                { $push: { message: chats } },{new:true});
        
        }

        updated = true;

        docs = await Schemas.schemaA.register.find({_id:payload.reciever});
        username=docs[0].username;
        
        
    }catch(err){
        updated = false
    }finally{
        // let result = {
        //     'payload':data
        // }
        return {
            updated,
            username
        };
    }
}

module.exports.message = messageList;