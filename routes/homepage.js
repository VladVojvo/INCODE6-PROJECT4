const express = require('express')
const router = express.Router()
const db = require('../database')


router.get('/', (req, res) => {
       /* res.render('pages/homepage')*/
        
        db.any('select * from users')
            .then((users) => {
                console.log(users)
                res.render('pages/homepage',{
                    users: users
                }) 
                res.end()    
            })
            .catch((err) =>{
                res.send(err)
                res.end()
            })
    })  

module.exports = router