const express = require('express')
const router = express.Router()
const {toHome} = require('../middleware/redirect')

//include bcryptjs
const bcrypt = require('bcryptjs')

//Connection to db
const db = require('../database') 

//Regex for validation
const regexForEmail = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/
const regexForNumbers = /\d/
const regexForSpecialCharacters = /[-|$|=|_|(|)|{|}|:|;|'|"|.|>|<|,|!|@|#|%|^|&|?|\/|\\|\||~|`|*]/

//Get method to login page
router.get('/', toHome, (req,res) =>{
    res.render('pages/loginpage')
})

router.post('/', (req,res) => {
  /*   console.log(req.session) */
    const {email, password} = req.body
    const cleanemail = email ? email.toLowerCase().trim() :" " 
    const errors = []
    

    //check if fields are empty
    if(!email || !password) {
        errors.push({message:"Please enter all fields"}) 
    }
    //check if email is valid
    else if(!regexForEmail.test(cleanemail)){
        errors.push({message:"Enter a valid email"})
    }
    //check if password is valid
    else if(password.length < 8){
           errors.push({message:"Password should be atleast 8 digits "})
    }
    else{
        console.log("no errors")
    }

    if(errors.length > 0){
        /* console.log(errors) */
        res.render('pages/loginpage', {errors})
       }
    else{
        //check if email id exists in the db
        db.oneOrNone('SELECT * FROM users WHERE email=$1;',[cleanemail])
        .then((user)=>{
            if(!user){
                errors.push({message:"User does not exists"})
                res.render('pages/loginpage', {errors})
            }
            else{
                //check if the password matches
                const checkPassword = bcrypt.compareSync(password, user.hashpwd)
                if(!checkPassword){
                    errors.push({message:"Password does not match"})
                    res.render('pages/loginpage', {errors})
                }
                else{
                    req.session.userId = user.userid
                    const name = user.firstname
                    /* res.send("Login successful!!") */
                    res.redirect('/home')
                }
                
            }
        })
        .catch((err)=>{
            console.log(err)
            res.send(err)
        })
    }   
    
})


module.exports = router