const express = require('express')
const router = express.Router()

//include bcryptjs
const bcrypt = require('bcryptjs')

//Connection to db
const db = require('../database') 

//Get method to login page
router.get('/', (req,res) =>{
    res.render('pages/loginpage')
})



module.exports = router