const express = require('express')
const db = require('../database')
const bcrypt = require('bcryptjs')
const router = express.Router()

router.get('/*', (req,res)=>{
   
    res.render('pages/resetpassword')
})

router.post('/*', (req,res)=>{
    const user = req.path.substring(1).trim()
    const {email, password, confirmpassword} = req.body
    const cleanemail = email.trim()
   
    if(cleanemail!=user){
       
    }else if(password.length < 8){
        
    }
     //check if password and confirm password matches
    else if(password!=confirmpassword){
     
    }
    else{
        console.log("No errors")
    }
    
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)
        db.none('UPDATE users set password = $1, hashpwd = $2 where email = $3;',[password, hashPassword, cleanemail])
        .then(()=>{
            /* res.send("Password updated successfully") */
            req.flash('success','Password updated successfully')
            res.redirect('/')
        })
        .catch((err)=>{
            res.send(err)
        })
   
})

module.exports = router