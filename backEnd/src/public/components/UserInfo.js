const mongoose = require("mongoose");
const Schemas = require("../db/dbSchemas");

mongoose.connect("mongodb://localhost/chatApplication");

const userinfo = async (id,username) => {
  let error = false;
  let success = false;
  let data;
  try {
    let docs;
    if(id){
       docs = await Schemas.schemaA.register.find({ _id: id });
    }else if(username){
       docs = await Schemas.schemaA.register.find({ username: username });
    }
    
    

    if (docs) {
      success = true;
      data = {
        name: docs[0].name,
        status: docs[0].status,
        dp: docs[0].image,
        date:docs[0].date,
      };
    } else {
      exist = false;
      error = false;
      data = "";
    }
  } catch (err) {
    error = true;
    data = "";
  } finally {
    let result = {
      sucess: success,
      error: error,
      data: data,
    };
    return result;
  }
};

module.exports.userinfo = userinfo;
