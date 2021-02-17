const Sequelize = require('sequelize')

const dotenv = require("dotenv");
const { BOOLEAN } = require('sequelize');
dotenv.config();

const db = new Sequelize({
  dialect: "mysql",
  database: "plifty", 
  username: "creator",
  password: "letmein"
});

const Users = db.define('Users' , {
    Id : {
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
    },
    token : {
        type : Sequelize.STRING
    },
    Exp : {
        type : Sequelize.TEXT
    },
    Rating : {
        type : Sequelize.INTEGER,
        defaultValue : '0'
    },
    Matches : {
        type : Sequelize.TEXT,
        defaultValue : ''
    },
    Notification : {
        type : Sequelize.TEXT
    }
})

const Skills = db.define('Skills' , {
    Id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement: true,
    },
    skill : {
        type : Sequelize.STRING
    }
})

const ReviewsUsers = db.define('ReviewsUsers' , {
    Id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement: true,
    },
    Body : {
        type : Sequelize.TEXT
    },
    Rating : {
        type : Sequelize.INTEGER
    },
    AuthorId : {
        type : Sequelize.INTEGER
    }
}) 

ReviewsUsers.belongsTo(Users)

const Teams = db.define('Teams' , {
    Id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement: true,
    },
    TeamName : {
        type : Sequelize.STRING

    },
    TeamField : {
        type : Sequelize.STRING
    },
    TeamPlayers : {
        type : Sequelize.TEXT,
        defaultValue : ''
    },
    TeamLeader : {
        type : Sequelize.INTEGER
    },
    Matches : {
        type : Sequelize.TEXT,
        defaultValue : ''
    },
    Tourna_Played : {
        type : Sequelize.INTEGER,
        defaultValue: 0
    }
})

Teams.belongsTo(Users)

const Tournaments = db.define('Tournaments' ,{
    Id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement: true,
    },
    TourName : {
        type : Sequelize.STRING
    },
    Venue : {
        type : Sequelize.STRING
    },
    Description : {
        type : Sequelize.TEXT
    },
    Participants : {
        type : Sequelize.TEXT,
        defaultValue : ''
    },
    Matches : {
        type : Sequelize.TEXT,
        defaultValue : ''
    },
    Active : {
        type : Sequelize.BOOLEAN,
        defaultValue : true
    }
})

Tournaments.belongsTo(Users)

const Matches = db.define('Matches' , {
    Id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement: true,
    },
    Type : {
        type : Sequelize.STRING
    },
    Challenger : {
        type : Sequelize.INTEGER
    },
    Challengee : {
        type : Sequelize.INTEGER
    }
})

const ChatRoom  = db.define('ChatRoom' , {
    Id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement: true,
    },
    parti : {
        type : Sequelize.INTEGER
    },
    parti_two : {
        type : Sequelize.INTEGER
    }
})

const Chats = db.define('Chats' , {
    Id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement: true,
    },
    Message : {
        type : Sequelize.TEXT
    }
})

Chats.belongsTo(Users)
Chats.belongsTo(ChatRoom)

module.exports = {Users , db , Skills  ,ReviewsUsers , Teams  , Tournaments , Matches , Chats , ChatRoom }
