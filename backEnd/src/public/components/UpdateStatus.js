const mongoose = require("mongoose");
const Schemas = require("../db/dbSchemas");

mongoose.connect("mongodb://localhost/chatApplication");

const statusupdate = async (username, status, date) => {
  let error = false;
  let success = false;
  let data;
  try {
    let values = {
      status: status,
      last: date,
    };
    let docs = await Schemas.schemaA.register.findOneAndUpdate(
      { username: username },
      { $set: { status: values } }
    );

    if (docs) {
      success = true;
    } else {
      success = false;
      error = false;
    }
  } catch (err) {
    error = true;
  } finally {
    let result = {
      sucess: success,
      error: error,
    };
    return result;
  }
};

module.exports.statusupdate = statusupdate;
