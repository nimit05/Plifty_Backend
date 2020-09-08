const {Router} = require('express')
const route = Router()
const {Users , Skills} = require('../../db/db')
const {auth} = require('../../middlewares/auth')

route.post('/bio' , auth , async(req,res) => {
    if(req.body.bio){
        req.user.bio = req.body.bio
        req.user.save()
        res.status(200).send(true)
    }
})

route.post('/skills' , auth , async(req,res) => {
    if(req.body.skills){
        req.user.Skills = req.body.skills;
        req.user()
        res.status(200).send(true)
    }
})

route.post('/exp', auth ,  async(req,res) => {
    let a = req.body
    let arr = []
    if(a.title){
        arr.push(a.teamName)
    }else{
        arr.push('')
    }
    if(a.teamName){
        arr.push(a.tournament)
    }else{arr.push('')}
    if(a.des){
        arr.push(a.des)
    }else{
        arr.push('')
    }

    req.user.Exp = arr.join(';')
    req.user.save()

    res.status(200).send(req.user.Exp)

})

module.exports = {route}