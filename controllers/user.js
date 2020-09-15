const {Users} = require('../db/db')
const {getrandomstring} = require('../utils/string')

async function CreateUser(FirstName , LastName ,  Type , Phone_Num , Email , Password ){

    if(Phone_Num.length != 10){
        throw new Error('Ivalid Phone Number');
    }
    console.log(Phone_Num)
    
    const email = await Users.findOne({
        where : {Email}
    })

    const phone_Num = await Users.findOne({
        where : {Phone_Num}
    })
    console.log('checking in function')

    if(username || email || phone_Num){
        if(phone_Num){
            throw new Error('Phone number already exists');
        }
        if(email){
            throw new Error('email  already exists');
        }
    }

    console.log(FirstName)

    const user = await Users.create({
        FirstName,
        LastName,
        token : getrandomstring(32),
        Type,
        Phone_Num,
        Email,
        Password
        })

    return user;
}

module.exports = {CreateUser}