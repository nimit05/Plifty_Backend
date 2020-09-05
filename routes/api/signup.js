const {Router} = require('express')
const route = Router()
const {auth} = require('../../middlewares/auth')
const { Users } = require('../../db/db')
const {CreateUser} = require('../../controllers/user')

route.post('/' , async(req,res) => {

    try{
        console.log('signup-entered')
        let a = req.body
        const user = await CreateUser(a.f_name , a.l_name , a.username,
            a.gender , a.age , a.type , a.phone_num , a.email , a.password)

            console.log('bchdvcjhdv')

        if(user){
            if(a.skills){
                user.Skills = a.skills;
                user.save()
            }
            console.log('user-created')
            res.send(user)
        }
    }catch(err){
        res.send(err)
    }
})

module.exports = {route}