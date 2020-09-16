const {Router} = require('express')
const route = Router()
const {CreateUser} = require('../../controllers/user')
const bcrypt = require('bcrypt')

route.post('/' , async(req,res) => {

    try{
        console.log('entered')
        console.log(req.body)
        let a = req.body
        bcrypt.hash(a.password , 12 , async(err ,hash) => {
            if(err){
                res.send(err.message)
            }else{
                console.log('in bcrypt')
                try{
                    const user = await CreateUser(a.f_name , a.l_name ,
                          a.type , a.phone_num , a.email , hash)
                        req.session.token = user.token;
                        req.session.save()

                        res.send('sign up successfuly')
                }catch(err){
                    res.send({err : err.message})
                }
            }
    })
    
    }catch(err){
        res.send(err.message)
    }
})

module.exports = {route}