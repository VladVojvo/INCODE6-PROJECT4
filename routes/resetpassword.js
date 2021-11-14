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
    const errors = []
    if(cleanemail!=user){
        errors.push({message:"Invalid user"})
    }else if(password.length < 8){
        errors.push({message:"Password should be atleast 8 digits "})
    }
     //check if password and confirm password matches
    else if(password!=confirmpassword){
     errors.push({message:"Passwords doesn't match"})
    }
    else{
        console.log("No errors")
    }
    /* if(error.length>0){
        res.render('pages/resetpassword',{error})
    }else{ */
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)
        db.none('UPDATE users set password = $1, hashpwd = $2 where email = $3;',[password, hashPassword, cleanemail])
        .then(()=>{
            res.send("Password updated successfully")
        })
        .catch((err)=>{
            res.send(err)
        })
    /* } */
})

module.exports = router