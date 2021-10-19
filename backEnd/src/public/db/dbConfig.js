const mongoose = require('mongoose');

const connectMongo = () =>{

    return  mongoose.connect('mongodb://localhost/chatApplication');
}

connectMongo();

module.exports = connectMongo;
