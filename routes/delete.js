const express = require('express')
const router = express.Router()
const db = require('../database')

//Regex for validation
const regexForEmail = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/
const regexForAlphabets = /[a-z]|[A-Z]/
const regexForSpecialCharacters = /[-|$|=|_|(|)|{|}|:|;|'|"|.|>|<|,|!|@|#|%|^|&|?|\/|\\|\||~|`|*]/

router.post('/', (req, res)=>{
    const {scheduleid} = req.body
    const cleanscheduleid = scheduleid.trim()
    const errors = []

    if(!cleanscheduleid||regexForAlphabets.test(cleanscheduleid)||regexForSpecialCharacters.test(cleanscheduleid)||cleanscheduleid==null||cleanscheduleid==""){
        errors.push({message:"Enter a valid schedule id"})
       /*  res.render('pages/schedules', {errors})  */
        res.send(errors)
    }else{
        db.any('select * from schedules where scheduleid=$1 and userid=$2;',[cleanscheduleid, req.session.userId])
        .then((data)=>{
        if(data.length==0){
            errors.push({message:`No schedules with schedule id: ${cleanscheduleid} for the given user`})
            /* res.render('pages/schedules', {errors}) */ 
            res.send(errors)
        }else{
           
            db.none('delete from schedules where scheduleid=$1',[cleanscheduleid])
            .then((data)=>{
                res.redirect('/schedules')
            })
            .catch((err)=>{
             res.send(err)
            })
            }
    })
    .catch((err)=>{
        res.send(err)
    })
    }
    
})

module.exports = router