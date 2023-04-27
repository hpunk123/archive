const router = require('express').Router()
const passport = require('passport')
const { poolArchivo } = require('../database/db.js')
const queryArchivo = require('../database/queryArchivo.js')
const { isLoggedIn, inNotLoggedIn } = require('../lib/auth')


router.get('/signup', inNotLoggedIn, async (req, res) => {
    const [ getCatRol ] = await poolArchivo.query( queryArchivo.catalogoRoles )    
    const [ getCAtUbi ] = await poolArchivo.query( queryArchivo.catalogoUbicaciones )
    res.render('auth/signup', { getCatRol,getCAtUbi })
})

router.post('/signup', inNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedict: '/signup',
    failureFlash: true
}))

router.get('/signin', inNotLoggedIn, (req, res) => {
    res.render('auth/signin')
})

router.post('/signin', inNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next)
})

router.get('/profile', isLoggedIn, async (req, res) => { 
        
        res.render('profile')        
       
})

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut()
    res.redirect('/signin')
})

module.exports = router