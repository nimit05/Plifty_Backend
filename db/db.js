const Sequelize = require('sequelize')

const dotenv = require("dotenv");
dotenv.config();

const db = new Sequelize({
  dialect: "mysql",
  database: process.env.database, //accuteDB
  username: process.env.username,
  password: process.env.password
});

const Users = db.define('users' , {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement: true,
    },
    FirstName : {
        type : Sequelize.STRING,
        allowNull : false
    },
    LastName : {
        type : Sequelize.STRING
    },
    Username : {
        type : Sequelize.STRING,    
        allowNull : false,
        unique : true
    },
    Gender : {
        type : Sequelize.STRING
    },
    Age : {
        type : Sequelize.INTEGER
    },
    Type : {
        type : Sequelize.STRING,
        allowNull : false
    },
    Phone_Num : {
        type : Sequelize.STRING
    },
    Email : {
        type : Sequelize.STRING,
        unique : true
    },
    Password : {
        type : Sequelize.STRING
    },
    Bio : {
        type : Sequelize.TEXT
    },
    Skills : {
        type : Sequelize.STRING,
        allowNull : true
    },
    token : {
        type : Sequelize.STRING
    }
})

module.exports = {Users , db}