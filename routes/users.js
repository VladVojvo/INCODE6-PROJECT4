const express = require("express")
const bcryptjs = require("bcryptjs")
const db = require ("../database")
//const users = require("../sql/users")
const router = express.Router()



router.get("/:id", (req, res) => {
    db.oneOrNone('SELECT * FROM users WHERE userid=$1; ', [req.params.id])
    .then((users) => {
        res.render("pages/users")
    })
    .catch((err) =>{
        console.log(err)
        res.send(err.message)
    })
               
    })  

module.exports = router