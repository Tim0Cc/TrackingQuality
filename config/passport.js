const LocalStrategy = require('passport-local').Strategy

module.exports = function(passport) {
  passport.use(
    new LocalStrategy( (username, password, done) => {
      const user = {
        userName: process.env.USERNAME,
        userPassword: process.env.LOGIN_PASSWORD
      }
      if (username != user.userName) {
        return done(null, false, {message: 'wrong username'})
      } else if (password != userPassword) {
        return done(null, false, {message: 'wrong password'})
      } else if ((username == user.userName) && (password != user.userPassword)) {
        return done(null, user)
      } else if (err) {
        return done(err)
      }
    })
  )
  passport.serializeUser(function(user, done) {
    done(null, user.userName)
  })
  passport.deserializeUser(function(userName, done) {
    let users = []
    const user = {
      name: process.env.USERNAME,
      userPassword: process.env.LOGIN_PASSWORD
    }
    users.push(user)
    users.findByName(userName, function(err, user) {
      done(err, user)
    })
  })
}