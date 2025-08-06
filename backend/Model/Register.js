const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registerSchema = new Schema({
    fullname:{
        type:String,//data type
        required:true,//validate
    },
     email:{
        type:String,//data type
        required:true,//validate
    },
     password:{
        type:String,//data type
        required:true,//validate
    },
     address:{
        type:String,//data type
        required:true,//validate
    },
    gender:{
        type:String,//data type
        required:true,//validate
    }
});

module.exports = mongoose.model(
    "Register",//file name
    registerSchema //function schema
)