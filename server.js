if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const expressLayout = require('express-ejs-layouts')
const path = require('path')
// const bootstrap = require('bootstrap')
// const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
// const passport = require('passport')

// require('./config/passport')(passport)

const indexRouter = require('./routes/index')
const changesRouter = require('./routes/changes')
const usersRouter = require('./routes/users')
const artistsRouter = require('./routes/artists')
const publicationsRouter = require('./routes/publications')
// const linksRouter = require('./routes/links')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('error', error => console.error(error))
mongoose.connection.once('open', () => console.log('Database connection established'))

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(expressLayout)
// app.use(methodOverride)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
// app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
// app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
// app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))


// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: true,
//   saveUninitialized: true
// }))
// app.use(passport.initialize())
// app.use(passport.session())
// app.use(flash())
// app.use((req, res, next) => {
//   res.locals.isAuthenticated = req.isAuthenticated()
//   next()
// })
// app.use((req, res, next) => {
//   res.locals.success_msg = req.flash('success_msg')
//   res.locals.error_msg = req.flash('error_msg')
//   res.locals.error = req.flash('error')
//   next()
// })

app.use('/', indexRouter)
app.use('/changes', changesRouter)
app.use('/login', usersRouter)
app.use('/artists', artistsRouter)
app.use('/publications', publicationsRouter)
// app.use('/links', linksRouter)

app.listen(process.env.PORT || 3000)