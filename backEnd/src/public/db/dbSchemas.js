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
    status: { type: Array, required: true, default: [] },
  },
  { collection: "Auth" }
);

//schema for converssation table

const conSchema = new mongoose.Schema(
  {
    userID: { type: String, required: true },
    message: { type: Array, required: true },
    pMessage: { type: Array, required: true },
    blockList: { type: Array, required: true },
    deleteList: { type: Array, required: true },
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
