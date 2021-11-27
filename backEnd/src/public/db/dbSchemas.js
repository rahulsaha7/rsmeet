var mongoose = require("mongoose");

//Schema for auth table
const regSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    mailVerified: { type: Boolean, required: true, default: false },
    username: { type: String, required: true, default: " " },
    image: { type: String, required: true, default: " " },
    otp: { type: Number, required: true, default: 000000 },
    otpvTime: { type: String, required: true },
    date: {
      type: Number,
      default: Date.now(),
    },
    report: { type: Number, required: true, default: 0 },
    status: [
      {
        online: {
          type: Boolean,
          required: true,
          default: false,
        },
        activity: {
          type: Number,
          required: true,
          default: Date.now(),
        },
      },
    ],
  },
  { collection: "Auth" }
);

//schema for converssation table

const conSchema = new mongoose.Schema(
  {
    userID: { type: String, required: true },
    message: [
      {
        userID: {
          msg: {
            type: String,
          },
          time: {
            type: String,
          },
          date: {
            type: String,
          },
          auther:{
            type:String,
          }
        },
      },
    ],

    pMessage: [
      {
        userID: {
          msg: {
            type: String,
          },
          time: {
            type: String,
          },
          date: {
            type: String,
          },
        },
      },
    ],
    blockList: [
      {
        userID: {
          type: String,
        },
      },
    ],
    deleteList: [
      {
        userID: {
          msg: {
            type: String,
          },
          time: {
            type: String,
          },
          date: {
            type: String,
          },
        },
      },
    ],
  },
  { collection: "Conversation" }
);

//Schema for finding email email in auth database

const userExists = new mongoose.Schema(
  {
    email: { type: String },
  },
  { collection: "Auth" }
);

const updatePass = new mongoose.Schema(
  {
    _id: { type: String },
    password: { type: String },
  },
  { collection: "Auth" }
);

const register = mongoose.model("reg", regSchema);
const dupUser = new mongoose.model("dup", userExists);
const update = new mongoose.model("uppass", updatePass);
const conve = new mongoose.model("Conversation", conSchema);

module.exports.schemaA = {
  register,
  dupUser,
  update,
  conve,
};
