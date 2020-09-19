const {Users} = require('../db/db')
const {getrandomstring} = require('../utils/string')
const bcrypt = require('bcrypt')

async function CreateUser(FirstName , LastName ,  Type , Phone_Num , Email , Password ){
    console.log('in controllers')
    console.log(Phone_Num)
    if(Phone_Num.length != 10){
        throw new Error('Invalid phone Number');
    }
    console.log(Phone_Num)
    
    const email = await Users.findOne({
        where : {Email}
    })

    if(email){
        throw new Error('email  already exists');
    }

    const phone_Num = await Users.findOne({
        where : {Phone_Num}
    })

    if(phone_Num){
        throw new Error('phone number already exists');
    }
    console.log('checking in function')

   
    console.log('crossed')
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


async function UserLogin(Email , Password){

    if(!Email || !Password){
        throw new Error('no username or password')
    }

    const user = await Users.findOne({
        where : {Email}
    })

    if(!user){
        throw new Error("User not found with that username")
    }

    console.log(user.Password)


    const match = await bcrypt.compare(Password , user.Password);
    if(match){
        return user
    }else{
        throw new Error('invalid password')
    }
   

}

module.exports = {CreateUser , UserLogin}