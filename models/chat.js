const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const ChatSchema = new Schema({
  message : {
      type : String
  },
  sender : {
      type : Schema.Types.ObjectId,
      ref : 'Users'
  },
  type : {
      type : String
  }
} , {timestamps : true})

const Chats = mongoose.model('chats' , ChatSchema)

module.exports = {Chats}