const {Skills} = require('../../db/db')
const { route } = require('./signup')
const {auth} = require('../../middlewares/auth')

route.get('/' , auth , async(req,res) => {
    const skills = await Skills.findAll()
    res.status(200).send(skills)
})

module.exports = {route}