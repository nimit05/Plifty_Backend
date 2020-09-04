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
    Username : {
        type : Sequelize.STRING,    
        allowNull : false,
        unique : true
    },
    Type : {
        type : Sequelize.STRING,
        allowNull : false
    },
    Num_Players : {
        type : Sequelize.INTEGER
    },
    Game_Name : {
        type : Sequelize.STRING
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
    }

})

module.exports = {Users , db}