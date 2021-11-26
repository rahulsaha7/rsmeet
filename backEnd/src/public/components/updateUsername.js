const mongoose = require('mongoose');
const Schemas = require('../db/dbSchemas');

mongoose.connect('mongodb://localhost/chatApplication');


const update = async (username,userID,imageI) =>{
    let exist = true;
    let error = false
    let updated = false;
    try{
        
        let docs = await Schemas.schemaA.register.findOneAndUpdate({_id:userID},
           {"$set": {username:username,image:imageI}});  
          
        if(docs){
           
            
            updated = true;


        }else{
            exist=false;
            error  =false;
            
        }
    }catch(err){
        error=true;
    }finally{
        let result = {
            'updated':updated,
            'exist':exist,
            'error':error
        }
        return result;
    }
}

module.exports.updateU = update;