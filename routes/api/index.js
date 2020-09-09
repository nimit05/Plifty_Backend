const {Router} = require('express')
const route = Router()

route.use('/register' , require('./signup').route)
route.use('/user' , require('./user').route)
route.use('/skills' , require('./skills').route)
route.use('/login' , require('./login').route)
route.use('/team' , require('./team').route)

module.exports = {route}