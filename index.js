const express = require('express')
const session = require('express-session')
const app = express()
const PORT = process.env.PORT 

//Middleware to parse req.body
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//For creating and using views
app.set('view engine', 'ejs')

// For css and images
app.use(express.static('public'))

//Session config
app.use(session({
    cookie:{
        maxAge: 1000 * 60 * 60 * 24
    },
    name: "mrcoffee_user",
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET

}))

//Route variables
const homeRouter = require('./routes/homepage')
const loginRouter = require('./routes/loginpage')
const smRouter = require('./routes/schedulemanagement')
const signupRouter = require('./routes/signup')
const logoutRouter = require('./routes/logout')
const schedulesRouter = require('./routes/allschedules')
const deleteRouter = require('./routes/delete')
const verifyMailRouter = require('./routes/verifymail')
const forgotPasswordRouter = require('./routes/forgotpassword')
const resetPasswordRouter = require('./routes/resetpassword')

//routes
app.use('/allschedules', schedulesRouter)
app.use('/home', homeRouter)
app.use('/schedules',smRouter)
app.use('/signup',signupRouter)
app.use('/logout',logoutRouter)
app.use('/delete', deleteRouter)
app.use('/verifymail', verifyMailRouter)
app.use('/forgotpassword', forgotPasswordRouter)
app.use('/resetpassword', resetPasswordRouter)
app.use('/',loginRouter)


//morgan
const morgan = require('morgan')
app.use(morgan('dev'))

//listening on port
app.listen(PORT)