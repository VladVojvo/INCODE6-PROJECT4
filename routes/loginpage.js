const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const db = require('../database') 


router.get('/', (req,res) =>{
    res.render('pages/loginpage')
/*    .catch((err) =>{
        res.send(err)
        res.end()
    })*/
})



module.exports = router