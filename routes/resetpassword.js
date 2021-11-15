const express = require('express')
const db = require('../database')
const bcrypt = require('bcryptjs')
const router = express.Router()

router.get('/*', (req,res)=>{
   
    res.render('pages/resetpassword')
})

router.post('/*', (req,res)=>{
    const user = req.path.substring(1).trim()
    const {email, oldpassword, newpassword, confirmpassword} = req.body
    const cleanemail = email.trim()
   
    if(cleanemail!=user){
       res.send("This link is valid only for a specific user")
    }else if(password.length < 8){
        res.send("Password must be atleast 8 characters")
    }
     //check if password and confirm password matches
    else if(password!=confirmpassword){
      res.send("Passwords does not match")
    }
    else{
        console.log("No errors")
    }
    db.oneOrNone('SELECT email, password FROM users WHERE email=$1;',[cleanemail])
    .then((user)=>{
        if(!user){
            res.send("User does not exist")
        }
        else{
            if(oldpassword!=user.password){
                res.send("Password is incorrect")
            }
            else{
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
                    }
        }
    })
})

module.exports = router