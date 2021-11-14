const express = require('express')
const db = require('../database')
const router = express.Router()

router.get('/*', (req,res)=>{
    const email = req.path.substring(1).trim()
    /* res.send(email) */
    db.oneOrNone('SELECT email FROM users WHERE email=$1;',[email])
    .then((user)=>{
        if(user){
            db.none('UPDATE users set isverified = $1 where email = $2;',[true, email])
            .then(()=>{
                res.redirect('/')
            })
            .catch((err)=>{
                res.send(err)
            })
        }
        else{
            res.send("Invalid user")
        }
    })
    .catch((err)=>{
        res.send(err)
    })
})

module.exports = router