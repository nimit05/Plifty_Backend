const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    FirstName : {
        type : String,
    },
    LastName : {
        type : String
    },
    Username : {
        type : String
    },
    Gender : {
        type : String
    },
    Age : {
        type : String
    },
    Type : {
        type : String
    },
    Phone_Num : {
        type : String
    },
    Email : {
        type : String
    },
    Password : {
        type : String
    },
    Bio : {
        type : String
    },
    Skills : {
        type : String
    },
    token : {
        type : String
    },
    Exp : {
        type : String
    }
} , {timestamps : true})

const Users = mongoose.model('Users' , UserSchema)

module.exports = {Users}