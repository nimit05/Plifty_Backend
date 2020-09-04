const {Router} = require('express')
const route = Router()

route.use('/signup' , require('./signup').route)

module.exports = {route}