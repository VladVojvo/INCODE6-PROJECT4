const express = require('express')
const router = express.Router()
const db = require('../database') 
const {toLogin} = require('../middleware/redirect')
router.get('/', toLogin, (req,res) =>{
    db.any('select * from users where userid=$1;',[req.session.userId])
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