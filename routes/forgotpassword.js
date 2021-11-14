const express = require('express')
const db = require('../database')
const router = express.Router()
const nodemailer = require('nodemailer')

//mail sender details
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'fitcustrainer@gmail.com',
        pass: 'fitcus@123'
    },
    tls:{
        rejectUnauthorized : false
    }
})

router.get('/', (req,res)=>{
    res.render('pages/forgotpassword')
})

router.post('/', (req,res)=>{
    const {email} = req.body
    const cleanemail = email ? email.toLowerCase().trim() :" " 
    const errors = []

    //validate the email
    if(cleanemail==""||cleanemail==null||!cleanemail) {
        errors.push({message:"Please enter the email"})
        res.render('pages/forgotpassword', {errors})
    }
    else{
        db.oneOrNone('SELECT * FROM users WHERE email=$1;',[cleanemail])
        .then((user)=>{
                if(!user){
                    errors.push({message:"User doesn't exist"})
                    res.render('pages/forgotpassword', {errors})
                }
                else{
                    //send verification mail
                    const mailOptions = {
                    from: ' "Reset your password" <schedulesApp@gmail.com>',
                    to: cleanemail,
                    subject: 'Mr.Coffee Schedules App - Password reset',
                    html: `<h2>Hello ${user.firstname}!</h2>
                           <h4> You can reset your password using the given link ...</h4>
                            <a href="http://localhost:4000/resetpassword/${cleanemail}">Reset password</a>`
                        }   
                    
                    transporter.sendMail(mailOptions, function(error, info){
                        if(error){
                          console.log(error)
                        }
                        else{
                          console.log("Reset password link is sent to your email address")
                        }
                    })
                        errors.push({message:"Reset link has been sent to your email"})
                        res.render('pages/forgotpassword',{errors}) 
                }
                })
                .catch((err)=>{
                    res.send(err)
                })
            }
})


module.exports = router