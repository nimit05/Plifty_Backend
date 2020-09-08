const {Users , Skills} = require('../../db/db')
const { route } = require('./signup')
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

route.post('/exp' , auth , async(req,res) => {
    let a = req.body

    
})

module.exports = {route}