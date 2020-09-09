const {Router} = require('express')
const route = Router()
const {auth} = require('../../middlewares/auth')
const {CreateUser} = require('../../controllers/user')
const bcrypt = require('bcrypt')

route.post('/' , async(req,res) => {

    try{
        let a = req.body
        bcrypt.hash(a.password , 12 , async(err ,hash) => {
            if(!err){
            const user = await CreateUser(a.f_name , a.l_name , a.username,
                a.gender , a.age , a.type , a.phone_num , a.email , hash)
                req.session.token = user.token;
                req.session.save()
            }
    })
    res.send("signed up successfully")
    }catch(err){
        res.send(err)
    }
})

module.exports = {route}