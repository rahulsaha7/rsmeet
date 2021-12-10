const mongoose = require("mongoose");
const Schemas = require("../db/dbSchemas");

mongoose.connect("mongodb://localhost/chatApplication");

const blockUser = async (id, aid) => {
  let exist = false;
  let error = false;
  let data;
  let updated = false;
  try {
    let docs = await Schemas.schemaA.conve.find({ userID: aid });
    if (docs) {
      data = docs[0].blockList;

      if (data.length < 0) {
        //Push the userlist
        docs = await Schemas.schemaA.conve.findOneAndUpdate(
          { userID: aid },
          { $push: { blockList: id } },
          { new: true }
        );
        updated = true;
      } else {
        if (data.includes(id)) {
          exist = true;
        } else {
          //Push the user id
          docs = await Schemas.schemaA.conve.findOneAndUpdate(
            { userID: aid },
            { $push: { blockList: id } },
            { new: true }
          );
          updated = true;
        }
      }
    }
  } catch (err) {
    error = true;
    data = err.message;
  } finally {
    let result = {
      updated: updated,
      exist: exist,
      error: error,
    };
    return result;
  }
};

const unblockUser = async (id, aid) => {
  let exist = true;
  let error = false;
  let data;
  let updated = false;
  try {
    let docs = await Schemas.schemaA.conve.find({ userID: aid });
    if (docs) {
      data = docs[0].blockList;

      if (data.length > 0) {
        //Push the userlist
        data = data.filter((val) => {
          return val !== id;
        });

        docs = await Schemas.schemaA.conve.findOneAndUpdate(
          { userID: aid },
          { $set: { blockList: data } }
        );
        updated = true;
      } else {
        exist = false;
        updated = false;
      }
    }
  } catch (err) {
    error = true;
    data = err.message;
  } finally {
    let result = {
      updated: updated,
      exist: exist,
      error: error,
      data: data,
    };
    return result;
  }
};

module.exports.block = {
  blockUser,
  unblockUser,
};
