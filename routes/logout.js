const express = require('express')
const router = express.Router()

router.get('/', (req, res) =>{
    req.session.destroy((err) => {
        if(err) {
            console.log(err)
            res.send(err.message)
        }else{
            res.clearCookie('mrcoffee_user')
            res.redirect('/')
        }
    })
})

module.exports = router