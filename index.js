require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const bcryptjs = require('bcryptjs')
const ejs = require('ejs')
const pgp = require('pg-promise')
const db = require('./database')

const app = express()
const PORT = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

//for css and images
app.use(express.static('public'))


//Route Variables
const homeRouter = require('./routes/homepage')
const usersRouter = require('./routes/users')
const errorRouter = require('./routes/error')
const loginRouter = require('./routes/loginpage')
const signupRouter = require('./routes/signup')

// ROUTES
app.use('/', homeRouter)
app.use('/users', usersRouter)
app.use('/login', loginRouter)
app.use('/signup', signupRouter)

app.use('*', errorRouter)

app.get('*', (req, res) => {
  res.render('pages/error', {
    message: req.query.message || 'This page cannot be found'
  })
})


  
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`))



