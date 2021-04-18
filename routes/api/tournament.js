const {Router} = require('express')
const route = Router()
const {Users ,Tournaments, Teams } = require('../../../backend_plifty/db/db')
const {auth} = require('../../middlewares/auth')
const seq = require('sequelize')

route.post('/' , auth , async(req,res) => {
    try {
        let a = req.body
        const tour = await Tournaments.create({
            TourName : a.tourName,
             Venue : a.venue,
             Description : a.description,
             EntryFee : a.entry_fee,
             UserId : req.user.Id
        })
        console.log("its a consel" + a.description)
        res.status(200).send(tour)
    } catch (error) {
        res.status(500).send({error : error.message})
    }

})

route.post('/participate' , auth , async(req,res) => {
    try {
        let a = req.body
        const tour = await Tournaments.findOne({
            where : {Id : a.tourId}
        })
    
        tour.Participants = tour.Participants + ";" + a.teamId
        tour.save()

        const team = await Teams.findOne({
            where : {
                TeamCode : a.teamId
            }
        })
        team.Tourna_Played = team.Tourna_Played + ";" + tour.Id
        res.status(200).send('participant added')
    } catch (error) {
        res.status(500).send({error : error.message})
    }
})

route.get('/participants' , auth , async(req,res) => {
    try {
        let a = req.query
        const tour = await Tournaments.findOne({
            where : {Id : a.tourId}
        })
    
       let arr = tour.Participants.split(';')
       let participants = []

       for(let i = 1 ; i < arr.length ; i++){
           const player = await Users.findOne({
               where : {Id : arr[i]}
           })
           participants.push(player)
       }

        res.status(200).send(participants)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

route.get('/' , auth , async(req,res) => {
    try {
        const tourna = await Tournaments.findAll({
            where : {
                UserId : req.user.Id
            }
        })

        res.send(tourna)
    } catch (error) {
        res.send({error : error.message})
    }
   
})

route.put('/active' , auth , async(req,res) => {
    try {
        const tour = await Tournaments.findOne({
            where : {
                Id : req.body.Id
            }
        })
        tour.Active = !tour.Active
        tour.save()
        res.send('done')
    } catch (error) {
        res.send({error : error.message})
    }
    
})

route.get('/active_tourna' , auth , async(req,res) => {
    try {
        const tourna = await Tournaments.findAll({
            where : {
                [seq.Op.and] : [{Active : true} , {UserId : {[seq.Op.not] : req.user.Id}}]
            }
        })
        res.send(tourna)
    } catch (error) {
        res.send({error : error.message})
    }
})

route.get('/past_tourna' , auth , async(req,res) => {
    try {
        let arr = []
        let teams = req.user.Teams.split(";")
        console.log(teams + "hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
        for(let i = 0 ; i < teams.length ; i++){
            const team = await Teams.findOne({
                where : {TeamCode : teams[i]}
            })
            let temp = team.Tourna_Played.split(';')
            for(let j= 0 ; j < temp.length ; j++){
                const tourna = await Tournaments.findOne({
                    where : { [seq.Op.and] : [{Id : temp[j]} , {Active : false}]}
                })
                arr.push(tourna)
            }
        }
        const tou = await Tournaments.findAll({
            where : { [seq.Op.and] : [{UserId : req.user.Id} , {Active : false}]}
        })
        arr = arr.concat(tou)
            res.status(200).send(arr)
    } catch (error) {
        res.send(error.message)
    }
})

module.exports = {route}