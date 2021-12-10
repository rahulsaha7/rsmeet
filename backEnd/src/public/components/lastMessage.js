const mongoose = require("mongoose");
const Schemas = require("../db/dbSchemas");

mongoose.connect("mongodb://localhost/chatApplication");

const lastmsg = async (username, userid) => {
  let exist = false;
  let error = false;
  let data;
  let author;
  try {
    let docs3 = await Schemas.schemaA.register.find({ username: username });
    if (docs3.length) {
      author = docs3[0]._id;
      const docs = await Schemas.schemaA.conve.find({ userID: userid });
      docs3 = await Schemas.schemaA.conve.find({ userID: author });
      if (docs) {
        exist = true;

        data = docs[0].message.concat(docs3[0].message);

        data.sort((a, b) => {
          return b.msgId - a.msgId;
        });

        for (let index = 0; index < data.length; index++) {
          if (
            (data[index].author === author &&
              data[index].receiver === userid) ||
            (data[index].author === userid && data[index].receiver === author)
          ) {
            data = data[index];
            break;
          } else {
            //   console.log(data[index].author, author);
          }
        }
      } else {
        exist = false;
        data = [];
      }
    } else {
      exist = false;
      data = [];
    }
  } catch (err) {
    error = true;
    data = err.message;
  } finally {
    let result = {
      exist: exist,
      error: error,
      data: data,
    };
    return result;
  }
};

module.exports.lastmsg = lastmsg;
