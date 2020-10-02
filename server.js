const exp = require('express')
const app = exp()
const mongoose = require('mongoose')
const session = require("express-session");
const dotenv = require("dotenv");
dotenv.config();

const {Chats} = require('./models/chat')

app.use(
    session({
      secret: process.env.session_sec,
      resave: true,
      saveUninitialized: true,
      cookie: { httpOnly: true }
    })
  );

const server = require('http').createServer(app)
const io = require('socket.io')(server)
  
io.on('connection' , socket => {

    socket.on('Input Chat Message' , msg => {
      connect.then(db => {
          try {
            let chat = new Chats({message : msg.chatmsg , sender : msg.userId  ,type : msg.type})

            chat.save((err ,doc) => {
                if(err) return  res.send({success : false , err}) 
  
                Chats.find({"_id" : doc._id})
                .populate("sender")
                .exec((err , doc) => {
  
                  return io.emit("Output Chat Message" , doc)
                })
            })
          } catch (error) {
            console.log(error)
          }
          
      })
    })
  })

app.use(exp.json());
app.use(exp.urlencoded({ extended: true }));

const connect = mongoose.connect('mongodb://localhost/plifty' , {useNewUrlParser : true , useUnifiedTopology : true})
 .then(() => console.log('mongodb connected ...'))
 .catch((err) => console.log(err))

app.use('/api' , require('./routes/api/index').route)

 server.listen(5000 , () => {
     console.log('server started')
 })

