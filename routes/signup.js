const express = require('express')
const router = express.Router()

//include bcryptjs
const bcrypt = require('bcryptjs')

//Connection to db
const db = require('../database') 

router.get('/', (req,res) =>{
    res.render('pages/signup')
})

//post method 
router.post('/', (req, res) =>{
          const salt = bcrypt.genSaltSync(10)
          const hashPassword = bcrypt.hashSync(req.body.password, salt)
         /*  const password = bcrypt.hashSync(req.body.password, salt) */
          /* req.body.password = password  */
          db.none('INSERT INTO users (firstname, lastname, email, password, hashpwd) VALUES($1, $2, $3, $4, $5);',[req.body.firstname, req.body.lastname, req.body.email, req.body.password, hashPassword])
         .then(()=>{
          res.redirect('/')
         })
         .catch((err)=>{
             res.send(err)
          })
  })

module.exports = router