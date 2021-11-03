const express = require('express')
const router = express.Router()
const db = require('../database') 

router.get('/', (req,res) =>{
    db.any('select * from users')
        .then((data) => {
            res.render('pages/homepage',{
                users: data
            }) 
            res.end()    
        })
        .catch((err) =>{
            res.send(err)
            res.end()
        })
})

module.exports = router