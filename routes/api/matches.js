const {Router} = require('express')
const route = Router()
const {Matches , Users , Teams , Tournaments} = require('../../../backend_plifty/db/db')
const {auth} = require('../../middlewares/auth')

route.post('/challenge' , auth , async(req,res) => {
    try {
        let a = req.body
        const match = await Matches.create({
            Type : a.type,
            Challenger : a.challengerId,
            Challengee : a.challengeeId
        })

        console.log(match)

        if(match.Type == 'team'){
            const challenger = await Teams.findOne({
                where : {Id : a.challengerId}
            })

            challenger.Matches = challenger.Matches + ";" + match.Id
            challenger.save()

            const challengee = await Teams.findOne({
                where : {Id : a.challengeeId}
            })

            challengee.Matches = challengee.Matches + ";" + match.Id
            challengee.save()
        }else{
            const challenger = await Users.findOne({
                where : {Id : a.challengerId}
            })

            challenger.Matches = challenger.Matches + ";" + match.Id
            challenger.save()

            const challengee = await Users.findOne({
                where : {Id : a.challengeeId}
            })

            challengee.Matches = challengee.Matches + ";" + match.Id
            challengee.save()
        }

        res.status(200).send('match fixed')
    } catch (error) {
        res.status(500).send(error.message)
        console.log(error)
    }

})


route.post('/tournament' , auth , async(req,res) => {
    try {
        let a = req.body
        const match = await Matches.create({
            Type : a.type,
            Challenger : a.challengerId,
            Challengee : a.chalengeeId
        })

        const tour = await Tournaments.findOne({
            where : {Id : a.tourId}
        })

        tour.Matches = tour.Matches + ";" + match.Id
        tour.save()

        res.status(200).send('match fixed')
    } catch (error) {
        res.status(500).send(error.message)
    }

})

route.get('/player' , auth , async(req,res) => {
    try {
        const player = await Users.findOne({
            where : {Id : req.query.id}
        })
        let arr = player.Matches.split(';')
        let matches = []
    
        for(let i= 1 ; i < arr.length ; i++){
            const match = await Matches.findOne({
                where : {Id : arr[i]}
            })
            matches.push(match)
        }

        res.status(200).send(matches)
    } catch (error) {
        res.status(500).send(error.message)
    }
  
})

route.get('/team' , auth , async(req,res) => {
    try {
        const team = await Teams.findOne({
            where : {Id : req.query.id}
        })
        let arr = team.Matches.split(';')
        let matches = []
    
        for(let i= 1 ; i < arr.length ; i++){
            const match = await Matches.findOne({
                where : {Id : arr[i]}
            })
            matches.push(match)
        }

        res.status(200).send(matches)
    } catch (error) {
        res.status(500).send(error.message)
    }
  
})

route.get('/tournament' , auth , async(req,res) => {
    try {
        const tour = await Tournaments.findOne({
            where : {Id : req.query.id}
        })
        let arr = tour.Matches.split(';')
        let matches = []
    
        for(let i= 1 ; i < arr.length ; i++){
            const match = await Matches.findOne({
                where : {Id : arr[i]}
            })
            matches.push(match)
        }

        res.status(200).send(matches)
    } catch (error) {
        res.status(500).send(error.message)
    }
  
})

module.exports = {route}