const express = require('express')
const router = express.Router()

//include bcryptjs
const bcrypt = require('bcryptjs')

//Connection to db
const db = require('../database') 

//Regex for validation
const regexForEmail = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/
const regexForNumbers = /\d/
const regexForSpecialCharacters = /[-|$|=|_|(|)|{|}|:|;|'|"|.|>|<|,|!|@|#|%|^|&|?|\/|\\|\||~|`|*]/


//get method
router.get('/', (req,res) =>{
    res.render('pages/signup')
})

//post method 
router.post('/', (req, res) =>{ 
            const { firstname, lastname, email, password, confirmpassword } = req.body
            const cleanemail = email ? email.toLowerCase().trim() :" " 
            const errors = []
    
           
            //validate the users

            //check if any of the fields are empty
           if(!firstname || !lastname || !email || !password || !confirmpassword) {
               errors.push({message:"Please enter all fields"}) 
           }
            //check if first name is valid
           else if(regexForNumbers.test(firstname)||regexForSpecialCharacters.test(firstname)){
            errors.push({message:"Enter a valid first name"})
           }
            //check if last name is valid
           else if(regexForNumbers.test(lastname)||regexForSpecialCharacters.test(lastname)){
            errors.push({message:"Enter a valid last name"})
           }
            //check if email is valid
           else if(!regexForEmail.test(cleanemail)){
            errors.push({message:"Enter a valid email"})
           }
            //check if password is valid
           else if(password.length < 8){
               errors.push({message:"Password should be atleast 8 digits "})
           }
            //check if password and confirm password matches
           else if(password!=confirmpassword){
            errors.push({message:"Passwords doesn't match"})
           }
           else{
                    console.log("no errors")
                }
                    
        if(errors.length > 0){
                    console.log(errors)
                    res.render('pages/signup', {errors})
                   }
        else{
                /* res.redirect('/') */
                db.oneOrNone('SELECT email FROM users WHERE email=$1;',[cleanemail])
                .then((user) =>{
                    if(user){
                        errors.push({message:"User already exists"})
                        res.render('pages/signup', {errors})
                    }
                    else{
                       /*  console.log("user does not exists") */
                       const salt = bcrypt.genSaltSync(10)
                       const hashPassword = bcrypt.hashSync(password, salt)
                       /* const password = bcrypt.hashSync(req.body.password, salt) */
                      /*  req.body.password = password  */
                       db.none('INSERT INTO users (firstname, lastname, email, password, hashpwd) VALUES($1, $2, $3, $4, $5);',[firstname, lastname, cleanemail, password, hashPassword])
                       .then(()=>{
                       res.redirect('/')
                       })
                       .catch((err)=>{
                            res.send(err)
                        })
                    } 
                })
                .catch((err)=>{
                    console.log(err)
                })
             }      
         
          
  })

module.exports = router