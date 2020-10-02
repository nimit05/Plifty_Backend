const {Router} = require('express')
const route = Router()
const {Chats , ChatRoom} = require('../../db/db')
const Seq = require('sequelize')
const {auth} = require('../../middlewares/auth')

route.get('/' , auth , async(req,res) => {
    try {
        let chats = await Chats.findAll({
            where : {ChatRoomId : req.query.roomId}
        })

        res.send(chats)
    } catch (error) {
        console.log(error)
        res.send({error : error.message})
    }
  
})

route.get('/roomExist' , auth , async(req,res) => {
    try {
        let room = await ChatRoom.findOne({where : {
            [Seq.Op.or] : [
                {
                    [Seq.Op.and] : [
                        {parti : req.query.id1},
                        {parti_two : req.query.id2}
                    ]
                },
                {
                    [Seq.Op.and] : [
                        {parti : req.query.id2},
                        {parti_two : req.query.id1}
                    ]
                }
            ]
            
        }})

        if(room.Id){
            res.send({id : room.Id})
        }

        res.send(room.Id)
    } catch (error) {
        res.send({error : error.message})
    }
})

route.post('/room' , auth , async(req,res) => {
    try {
        let room  = await ChatRoom.create({parti : req.body.userId , parti_two : req.body.playerId})
  
        if(room.Id){
          res.send(room.Id)
        }
      } catch (error) {
        console.log(error)
        res.send({error : error.message})
      }
})

module.exports = {route}