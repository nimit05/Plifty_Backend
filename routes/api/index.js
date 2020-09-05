const {Router} = require('express')
const route = Router()

route.use('/register' , require('./signup').route)

module.exports = {route}