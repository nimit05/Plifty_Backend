const {Users} = require('../../db/db')
const {Router} = require('express')
const route = Router()
const {UserLogin} = require('../../controllers/user')
const {auth} = require('../../middlewares/auth')

route.post('/' , async(req,res) => {
    
    try {
        let a = req.body
        try {
            const user = await UserLogin(a.username , a.password)
            req.session.token = user.token;
            req.session.save()
            console.log(req.session)
            res.send(user)
        } catch (error) {
          console.log(error.message)
           res.send({error :error.message})
        }
        
    } catch (error) {
        res.send(error.message)
    }

    // try {
    //   let a = req.body
    //   const user = await Users.findOne({Email : a.username} ,function(err, result) {
    //     if (err) throw err;
    //     console.log(result) 
    //   })

    //   res.send(user)
    // } catch (error) {
    //   res.send({error : error.message})
    // }
    
})

route.get('/session' , async(req,res) => {
    if(req.session.token){
      res.send({token : req.session.token})
    }else{
      res.send({err : 'error occured'})
    }
  })

module.exports = {route}