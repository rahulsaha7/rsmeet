var mongoose = require('mongoose');


//Schema for auth table 
const regSchema = new mongoose.Schema({
    _id:{type:String,required:true},
    name:{type: String, required:true},
    email:{type:String,required:true},
    phone:{type: String,required:true},
    password:{type:String,required:true},
    mailVerified:{type:Boolean,required:true},
    date : {type: Number , default:Date.now()}
},{collection:'Auth'});


//Schema for finding email email in auth database 

const userExists = new mongoose.Schema({
    email:{type:String}
},{collection:'Auth'});

const register = mongoose.model('reg',regSchema);
const dupUser = new mongoose.model('dup',userExists);


module.exports.schemaA = {
    register,
    dupUser
}

