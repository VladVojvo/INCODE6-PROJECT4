const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const db = require('../database') 

router.get('/', (req,res) =>{
    res.render('pages/signup')
})

//post method 
router.post('/', (req, res) =>{
    const {email, password} = req.body

          const salt = bcrypt.genSaltSync(10)
          const hashPassword = bcrypt.hashSync(password, salt)
         /*  const password = bcrypt.hashSync(req.body.password, salt) */
          
          db.none('INSERT INTO users (firstname, lastname, email, password, hashpwd) VALUES($1, $2, $3, $4, $5);',[req.body.firstname, req.body.lastname, req.body.email, req.body.password, hashPassword])
         .then(()=>{
          res.redirect('/')
         })
         .catch((err)=>{
             res.send(err.message)
          })
  })

module.exports = router 