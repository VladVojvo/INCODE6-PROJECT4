const express = require('express')
const router = express.Router()


router.get("/", (req, res) => {
        res.render("pages/error")
    })  

module.exports = router

/*express.use((error, req, res, next) => {
    res.render("pages/error")
})*/