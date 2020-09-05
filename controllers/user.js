const {db , Users} = require('../db/db')
const {getrandomstring} = require('../utils/String')

async function CreateUser(FirstName , LastName , Username , Gender , Age , Type , Phone_Num , Email , Password ){
    
    const username = await Users.findOne({
        where : {Username}
    })

    const email = await Users.findOne({
        where : {Email}
    })

    const phone_Num = await Users.findOne({
        where : {Phone_Num}
    })
    console.log('checking in function')

    if(username || email || phone_Num){
        console.log('validation error')
        if(phone_Num){
            return {error : 'phone Number already exists'}
        }
        if(email){
            return {error : 'email already exists'}
        }
        if(username){
            return {error : 'username already exists'}
        }
    }

    console.log('hanjii')

    const user = await Users.create({
        FirstName,
        LastName,
        Username,
        Gender,
        Age,
        token : getrandomstring(32),
        Type,
        Phone_Num,
        Email,
        Password,
        Skills
    })
    console.log(user)

    return user;
}

module.exports = {CreateUser}