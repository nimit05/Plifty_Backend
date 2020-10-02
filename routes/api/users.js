const {Router} = require('express')
const route = Router()
const {auth} = require('../../middlewares/auth')
const {Users} = require('../../db/db')

route.get('/all' , auth , async(req,res) => {
    try {
        const users = await Users.findAll()
        res.send(users)
    } catch (error) {
        console.log(error)
        res.send({error : error.message})
    }
    
} )

route.get('/specific' , auth , async(req,res) => {
    try {
        const user = await Users.findOne({
            where : {id : req.query.id}
        })

        res.send(user)
    } catch (error) {
        res.send({error : error.message})
    }
})

module.exports = {route}