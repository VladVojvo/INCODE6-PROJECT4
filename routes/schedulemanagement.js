const express = require('express')
const router = express.Router()
const db = require('../database')
const {toLogin} = require('../middleware/redirect')


router.get('/', toLogin, (req,res) =>{
    db.any('select * from schedules where userid=$1;',[req.session.userId])
    .then((data) => {
        /* res.render('pages/schedules',{
            schedules: data
        }) 
        res.end()     */
        if(data.length>0){
            res.send(data)
        }
        else{
            res.send("No schedules for the user")
        }
        
    })
    .catch((err) =>{
        res.send(err)
        res.end()
    })
})

router.post('/', (req,res) => {
    console.log(req.body)
})

module.exports = router