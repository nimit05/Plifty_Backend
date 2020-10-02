const {Router} = require('express')
const route = Router()
const {CreateUser} = require('../../controllers/user')
const bcrypt = require('bcrypt')


// route.post('/' , (req,res) => {


//     console.log('coming')

// const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

//     let buff = []
//      while(buff.length<16){
//          const count = parseInt(Math.random()*(62))
//          buff.push(ALPHA.charAt(count))
//      }

//     let user = new Users({
//         FirstName : req.body.f_name,
//         LastName : req.body.l_name,
//         Email : req.body.email,
//         password : req.body.password,
//         Phone_Num : req.body.phone_num,
//         Password : req.body.password,
//         token : buff.join('')
//     })

//     user.save()
//     .then(user => {
//         req.session.token = user.token
//         req.session.save();
//         console.log(user.token)
//         res.send('User created succesfully')
//     })
//     .catch((err) => console.log(err))
// })


route.post('/' , async(req,res) => {

    try{
        console.log('aya')
        let a = req.body
        bcrypt.hash(a.password , 12 , async(err ,hash) => {
            if(err){
                res.send(err.message)
            }else{
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