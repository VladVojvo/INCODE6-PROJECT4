const express = require('express')
const app = express()
const PORT = process.env.PORT 

//Middleware to parse req.body
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//For creating and using views
app.set('view engine', 'ejs')

// For css and images
app.use(express.static('public'))

//Route variables
const homeRouter = require('./routes/homepage')
const loginRouter = require('./routes/loginpage')
const smRouter = require('./routes/schedulemanagement')
const signupRouter = require('./routes/signup')

//routes
app.use('/home', homeRouter)
app.use('/schedules',smRouter)
app.use('/signup',signupRouter)
app.use('/',loginRouter)

//morgan
const morgan = require('morgan')
app.use(morgan('dev'))

//listening on port
app.listen(PORT)