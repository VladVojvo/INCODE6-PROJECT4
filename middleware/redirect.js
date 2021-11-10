//If the user is not logged in redirect the user to the login page
const toLogin = (req, res, next) =>{
    if(!req.session.userId){
        res.clearCookie('mrcoffee_user')
        res.redirect('/')
    }
    else{
        next()
    }
}

//If the user is already logged in redirect the user to the home page
const toHome = (req, res, next) =>{
    if(req.session.userId){
        res.redirect('/home')
    }
    else{
        next()
    }
}

module.exports = {toLogin, toHome}