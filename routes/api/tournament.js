const {Router} = require('express')
const route = Router()
const {Users ,Tournaments } = require('../../../backend_plifty/db/db')
const {auth} = require('../../middlewares/auth')

route.post('/' , auth , async(req,res) => {
    try {
        let a = req.body
        const tour = await Tournaments.create({
            TourName : a.tourName,
             Venue : a.venue,
             Description : a.description,
             UserId : req.user.id
        })

        res.status(200).send(tour)
    } catch (error) {
        res.status(500).send(error.message)
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

        res.status(200).send('participant added')
    } catch (error) {
        res.status(500).send(error.message)
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



module.exports = {route}