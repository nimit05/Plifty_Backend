const exp = require("express");
const app = exp();
const session = require("express-session");
const { db } = require("./db/db");
const dotenv = require("dotenv");
dotenv.config();
const {Chats , ChatRoom , Users} = require('./db/db');
const { Sequelize } = require("sequelize");
const path = require('path')

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
app.use(exp.static(path.join(__dirname, "build")));
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

  socket.on("Notification" , async(notify) => {
      try {
        let user = await Users.findOne({
          where : {
            Id : notify.userId
          }
        })

        let arr = user.Notification.split(';')
        arr.push(notify.msg)

        user.Notification = arr.join(';')
        user.save()

        return io.emit("notified" , user.Notification)
      } catch (error) {
        
      }
  })

  socket.on('Chat Room' , async(info) => {
    try {
      let room = await ChatRoom.findOne({where : {
        [Sequelize.Op.or] : [
            {
                [Seq.Op.and] : [
                    {parti : info.id1},
                    {parti_two : info.id2}
                ]
            },
            {
                [Seq.Op.and] : [
                    {parti : info.id2},
                    {parti_two : info.id1}
                ]
            }
        ]
        
    }})

    let chats =  []
    if(room.Id){

       chats = await ChatRoom.findAll({
        where : {ChatRoomId : room.Id}
      })

    }else{
      let room = await ChatRoom.create({
        parti : info.id1,
        parti_two : info.id2
      })

    }

    return io.emit('Output Chat Room' , chats )
       
    } catch (error) {
      
    }
  })

  
})

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.port || 6878

db.sync().then(() => {
  server.listen(port , () => {
      console.log('Server Started')
  })
})
