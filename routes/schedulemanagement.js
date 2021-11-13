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
            res.render('pages/schedules',{
                schedules: data})
        }
        else{
            res.render('pages/schedules',{
                schedules: []})
        }  
    })
    .catch((err) =>{
        res.send(err)
        res.end()
    })
})

router.post('/', (req,res) => {
    const{ day, start_at, end_at} = req.body
   /*  res.send(`On ${day} starts at: ${start_at}, ends_at: ${end_at}`) */
    db.none('INSERT INTO schedules (userid, sday, start_at, end_at) VALUES($1, $2, $3, $4);',[req.session.userId, day, start_at, end_at])
    .then(()=>{
    res.redirect('/schedules')
    })
    .catch((err)=>{
         res.send(err)
     })
 })

module.exports = router