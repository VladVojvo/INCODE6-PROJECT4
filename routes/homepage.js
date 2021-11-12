const express = require('express')
const router = express.Router()
const db = require('../database')
const pgp = require('pg-promise')

router.get('/', (req, res) => {
    
    
        db.task(async t =>{
            const users = await t.any('SELECT * FROM users');
            const schedules = await t.any('SELECT * FROM schedules')
            const together = await t.any ('SELECT users, *, schedules, *  from users  FULL OUTER JOIN schedules ON schedules.userid=users.userid');             
           // console.log(together)
            return {users, schedules, together}
            
        })
        
            .then(({users, schedules, together}) => {                
                res.render('pages/homepage',{
                    users, 
                    schedules,
                    together
                }) 
                res.end()
                    
            })
            
            .catch((err) =>{
                res.send(err)
                res.end()
            })
    })  

module.exports = router

 