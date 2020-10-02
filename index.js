const exp = require("express");
const app = exp();
const session = require("express-session");
const { db } = require("./db/db");
const dotenv = require("dotenv");
dotenv.config();
const {Chats , ChatRoom} = require('./db/db')

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

app.use(exp.urlencoded({ extended: true }));
app.use(exp.json());
app.use("/api", require("./routes/api/index").route);


io.on('connection' , socket => {

 

  socket.on('Input Chat Message' , async(msg) => {
        try {
          let chat = await Chats.create({Message : msg.chatmsg , UserId : msg.userId  ,ChatRoomId : msg.roomId})

          if(chat.Id){
            return io.emit("Output Chat Message" , chat)
          }

        } catch (error) {
          console.log(error)
        }
        
  })
})

db.sync().then(() => {
  server.listen(6878 , () => {
      console.log('Server Started')
  })


})
