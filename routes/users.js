const express = require("express")
const bcryptjs = require("bcryptjs")
const db = require ("../database")
//const users = require("../sql/users")
const router = express.Router()



router.get("/:id", (req, res) => {

    db.task(async t =>{
        const users = await t.any('SELECT * FROM users WHERE userid=$1; ', [req.params.id]);
        //console.log(users)
        const schedules = await t.any('SELECT * FROM schedules')
        const together = await t.any ('SELECT users, *, schedules, *  from users  FULL OUTER JOIN schedules ON schedules.userid=users.userid');             
        //console.log(together)
        return {users, schedules, together}
        
    })
    
        .then(({users, schedules, together}) => {                
            res.render('pages/users',{
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