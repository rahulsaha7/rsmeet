const mongoose = require("mongoose");
const Schemas = require("../db/dbSchemas");

mongoose.connect("mongodb://localhost/chatApplication");

const showstatus = async (id) => {
  let error = false;
  let success = false;
  let data;
  try {
    let docs = await Schemas.schemaA.register.find({ _id: id });
    if (docs) {
      success = true;
      data = docs[0].status;
    } else {
      success = false;
      error = false;
      data = "";
    }
  } catch (err) {
    error = true;
    data = err.message;
  } finally {
    let result = {
      sucess: success,
      error: error,
      data: data,
    };
    return result;
  }
};

module.exports.showstatus = showstatus;
