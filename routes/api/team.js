const {Router} = require('express')
const route = Router()
const {auth} = require('../../middlewares/auth')
const {Teams , Users} = require('../../db/db')

route.post('/' , auth , async(req,res) => {
    try {
        const team = await Teams.create({
            TeamName : req.body.Tname,
            UserId : req.user.id,
            TeamField : req.body.field
        })
        res.status(200).send(team)
    } catch (error) {
        res.status(500).send(error.message)
    }

})

route.post('/addPlayers' , auth , async(req,res) => {
    try {
        const team = await Teams.findOne({
            where : {Id : req.body.teamId}
        })
    
        let arr = team.TeamPlayers.split(';')
        arr.push(req.body.id)
        team.TeamPlayers = arr.join(';');
        team.save()

        res.status(200).send('added')
    } catch (error) {
        res.status(500).send(error.message)
    }

})

route.get('/players' , auth , async(req,res) => {

    try {
        const team = await Teams.findOne({
            where : {Id : req.query.id}
        })
        let arr = team.TeamPlayers.split(';')
        let players = []
        for(let i = 0 ; i <arr.length ; i++){
            let player = await Users.findOne({
                where : {Id : arr[i]}
            })
            if(player){
                players.push(player)
            }
        } 
        res.status(200).send(players)
    } catch (error) {
        res.status(500).send(error.message)
    }
  
})

route.delete('/player' , auth , async(req,res) => {
    try {
        const team = await Teams.findOne({
            where : {Id :req.query.teamId}
        })
        let arr = team.TeamPlayers.split(';')
        let ind = arr.indexOf(req.query.playerId)
        arr.splice(ind , 1)
    
        team.TeamPlayers = arr.join(";")
        team.save()
    
        res.status(200).send('deleted')  
    } catch (error) {
        res.status(500).send(error.message)
    }

})

route.delete('/leave' , auth , async(req,res) => {

    try {
        const team = await Teams.findOne({
            where : {Id : req.query.teamId}
        })
    
        let arr = team.TeamPlayers.split(';')
        let ind = arr.indexOf(req.query.playerId)
        arr.splice(ind ,1)
    
        team.TeamPlayers = arr.join(';')
        team.save()
    
        res.status(200).send('leaved')
    } catch (error) {
        res.status(500).send(error.message)
    }
})

route.delete('/' , auth , async(req,res) => {
    try {
        const team = await Teams.findOne({
            where : {Id : req.query.id}
        })
        team.destroy()
        res.status(200).send('team deletd')
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)

    }
 
})

module.exports = {route}