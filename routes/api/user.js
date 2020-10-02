const {Router} = require('express')
const route = Router()
// const {Users , Skills , ReviewsUsers} = require('../../../backend_plifty/db/db')
const {auth} = require('../../middlewares/auth')
const {Users} = require('../../models/users')

route.post('/bio' , auth , async(req,res) => {
    if(req.body.bio){
        req.user.bio = req.body.bio
        req.user.save()
        res.status(200).send(true)
    }
})

route.put('/exp', auth ,  async(req,res) => {
    let a = req.body
    let arr = []
    if(a.title){
        arr.push(a.teamName)
    }else{
        arr.push('')
    }
    if(a.teamName){
        arr.push(a.tournament)
    }else{arr.push('')}
    if(a.des){
        arr.push(a.des)
    }else{
        arr.push('')
    }

    req.user.Exp = arr.join(';')
    req.user.save()

    res.status(200).send(req.user.Exp)

})

route.put('/bio' , auth , async(req,res) => {

    try {
        if(req.body.bio){
            req.user.Bio = req.body.bio;
            req.user.save()
        }
        res.status(200).send(true)
    } catch (error) {
        res.send(error)
    }

})

route.put('/skills' , auth , async(req,res) => {
    try {
        if(req.body.skills){
            req.user.Skills = req.body.skills
            req.user.save()
        }
        res.status(200).send(true)
    } catch (error) {
        res.send(error)
    }

})

route.post('/review'  ,auth , async(req,res) => {
    try {
        let a = req.body
        let user = req.user

        let reviwedUser = await Users.findOne({
            where : {
                id : a.userId
            }
        })

        const Reviews = await ReviewsUsers.findAll({
            where : {UserId : reviwedUser.Id}
        })
        let len = Reviews.length

        if(a.rating){
            let rat = ((parseInt(reviwedUser.Rating)*len) + parseInt(a.rating))/(len + 1);
            reviwedUser.Rating = rat;
            reviwedUser.save()
        }
        const review = await ReviewsUsers.create({
            Body : a.body,
            Rating : a.rating,
            UserId : a.userId,
            AuthorId : user.Id
        })
            res.status(200).send(review)
    } catch (error) {
        res.status(422).send("internal error occured")
        console.log(error)
    }
    
})

route.get('/getSender' , async(req,res) => {
    const user = await Users.find({_id : req.query.id})
    res.send(user) 
} )

module.exports = {route}