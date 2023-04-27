const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { poolArchivo } = require('../database/db.js')
const queryArchivo = require('../database/queryArchivo.js')
const helpers = require('../lib/helpers')


passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const [ rows ] = await poolArchivo.query( queryArchivo.loginUser, [username] )
    if (rows.length > 0) {
        const user = rows[0]
        const validPassword = await helpers.matchPassword(password, user.password)

        if (validPassword) {
            done(null, user, (user.password))
        } else {
            done(null, false, req.flash('message', 'Constraseña Invalida'))
        }
    } else {
        return done(null, false, req.flash('message', 'Evaluación Finalizada o No Registrada'))
    }

}))

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, username, password, done) => {
    const { nombre_usuario,rol_usuario,ubicacion_usuario } = req.body
    const newUser = {
        username,
        password,
        nombre_usuario,
        rol_usuario,    
        ubicacion_usuario    
    }

    try {
        newUser.password = await helpers.encryptPassword(password)
        const result = await poolArchivo.query( queryArchivo.newUser,[ newUser ])
        newUser.id_usuario = result.id_usuario
        return done(null, newUser)

    } catch (e) {
        console.log( e )
    }


}))
passport.serializeUser((username, done) => {
    done(null, username.id_usuario)
})

passport.deserializeUser(async (id_usuario, done) => {
    const rows = await poolArchivo.query( queryArchivo.deserializeUser, [id_usuario])
    done(null, rows[0])
})


