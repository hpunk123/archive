const express = require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const path = require('path')
const session = require('express-session')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const MySQLStore = require('express-mysql-session')
const { sessionDB } = require('./database/db')

const app = express()
app.use( express.json() )
app.use(cookieParser())
require('./lib/passport')

app.use(session({
    secret : 'archiveCecc',
    resave: true,
    saveUninitialized:true,
    store : new MySQLStore( sessionDB )
}))

app.use(passport.initialize())
app.use(passport.session())

app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs')


app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use((req, res, next) => {
    app.locals.user = req.user    
    next()
})

app.use(require('./routes'))
app.use(require('./routes/autentificacion'))

app.use(express.static(path.join(__dirname, 'public')))

module.exports = { app }