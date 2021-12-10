const express = require("express");
const mongoose = require("mongoose");
const Schemas = require("../db/dbSchemas");

mongoose.connect("mongodb://localhost/chatApplication");

const list = async (username) => {
  let exist = false;
  let error = false;
  let data;
  let userId;
  try {
    const docs = await Schemas.schemaA.register.find({
      username: { $ne: username },
    });
    const docs2 = await Schemas.schemaA.register.find({ username: username });

    if (docs.length) {
      exist = true;
      data = docs;
      userId = docs2[0]._id;
    } else {
      exist = true;
      data = [];
      userId = [];
    }
  } catch (err) {
    error = true;
  } finally {
    let result = {
      exist: exist,
      error: error,
      data: data,
      user: userId,
    };
    return result;
  }
};

const msglist = async (id, aid, type) => {
  let exist = false;
  let error = false;
  let data;
  let user;
  let blocklist;
  let blocked = false;
  try {
    const docs = await Schemas.schemaA.conve.find({ userID: id });
    const docs2 = await Schemas.schemaA.register.find({ _id: id });
    const docs3 = await Schemas.schemaA.conve.find({ userID: aid });
    if (docs.length) {
      exist = true;
      if (type === "ps") {
        data = docs[0].pMessage.concat(docs3[0].pMessage);
      } else if (type === "nt") {
        data = docs[0].message.concat(docs3[0].message);
      }

      //data = docs3;
      user = {
        name: docs2[0].name,
        image: docs2[0].image,
      };

      if (docs3[0].blockList.length > 0) {
        if (docs3[0].blockList.includes(id)) {
          blocked = true;
        }
      }
    } else {
      exist = false;
      data = [];
      user = [];
    }
  } catch (err) {
    error = true;
    data = err.message;
  } finally {
    let result = {
      exist: exist,
      error: error,
      data: data,
      user: user,
      blocked: blocked,
    };
    return result;
  }
};

module.exports.listU = {
  list,
  msglist,
};
