const exp = require('express')
const app = exp();
const session = require('express-session')
const {db} = require('./db/db')
const dotenv = require('dotenv')
dotenv.config();

app.use(
    session({
      secret: process.env.session_sec,
      resave: true,
      saveUninitialized: true,
      cookie: { httpOnly: true }
    })
  );

  app.use(exp.urlencoded({extended : true}))
  app.use(exp.json())
  app.use("/api", require("./routes/api/index").route)

db.sync({alter : true}).then(() => {
  app.listen(6000 , () => {
      console.log('Server Started')
  })
})