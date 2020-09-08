const {Router} = require('express')
const route = Router()

route.use('/register' , require('./signup').route)
route.use('/user' , require('./user').route)
route.use('/skills' , require('./skills').route)

module.exports = {route}