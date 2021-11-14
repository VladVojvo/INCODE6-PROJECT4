const express = require('express')
const router = express.Router()
const db = require('../database')


const query  = 'select users.userid, users.firstname, users.lastname, users.email, schedules.scheduleid, schedules.sday, schedules.start_at, schedules.end_at from users inner join schedules on users.userid = schedules.userid;'

router.get('/', (req, res)=>{
    db.any(query)
    .then((data)=>{
        res.render('pages/allschedules',{
            schedules: data})
    })
    .catch((err)=>{
        res.send(err)
        res.end()
    })
   /*  res.send("all schedules") */
 })

 module.exports = router