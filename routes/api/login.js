const {Users} = require('../../db/db')
const {Router} = require('express')
const route = Router()
const bcrypt = require('bcrypt')

route.post('/' , async(req,res) => {
    let a = req.body

    console.log('aya bhai')

    if(!a.username || !a.password){
        res.status(422).send({error : "no username or password"})
    }

    const user = await Users.findOne({
        where : {Username : a.username}
    })
    console.log(user)
    if(user == null){
        res.send({error : "User not found with that username"})
    }else{
    bcrypt.compare(a.password , user.Password , async(err , result) => {
       if(result){
           res.send("successfully logged in")
           req.session.token = user.token;
           req.session.save()
           console.log(req.session)
       }else{
           res.status(422).send({error : "Invalid password"})
       }
    })
}
})

module.exports = {route}