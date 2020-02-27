const express = require('express')
const app = express();
const PORT = process.env.PORT || 4000
const session = require('express-session')
const router = require('./routes/index.js')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/views/public'));
app.use(session({
    secret: 'mnp',
    resave: false,
    saveUninitialized: true
  }))

app.use(router)

app.listen(PORT, ()=> console.log('Running on port', PORT))

