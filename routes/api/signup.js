const {Router} = require('express')
const route = Router()
const {auth} = require('../../middlewares/auth')
const {CreateUser} = require('../../controllers/user')

route.post('/' , async(req,res) => {

    try{
        let a = req.body
        const user = await CreateUser(a.f_name , a.l_name , a.username,
            a.gender , a.age , a.type , a.phone_num , a.email , a.password)


        if(user){
            if(a.skills){
                user.Skills = a.skills;
                user.save()
            }
            req.session.token = user.token
            req.session.save()
            console.log(req.session)
            res.status(200).send(user)
        }
    }catch(err){
        res.send(err)
    }
})

module.exports = {route}