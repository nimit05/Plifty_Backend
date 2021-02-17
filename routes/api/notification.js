const {Router} = require('express')
const route = Router()
const {Users} = require('../../db/db')
const {auth} = require('../../middlewares/auth')

route.get('/' , auth , async(req,res) => {
    try {
        let arr = req.user.Notification.split(";");
        res.send(arr)
    } catch (error) {
        res.send({error : error.message})
    }
})

module.exports = {route}