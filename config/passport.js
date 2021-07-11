const LocalStrategy = require('passport-local').Strategy

module.exports = function(passport) {
  passport.use(
    new LocalStrategy( (username, password, done) => {
      const user = {
        id: process.env.USER_ID,
        username: process.env.USERNAME,
        password: process.env.LOGIN_PASSWORD
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
    done(null, user.id)
  })
  passport.deserializeUser(function(id, done) {
    let users = []
    const nuser = {
      id: process.env.USER_ID,
      username: process.env.USERNAME,
      password: process.env.LOGIN_PASSWORD
    }
    users.push(nuser)
    const findByID = function(id, err, user) {
      const buser = users.find(({id}) => id == req.body.userid)
      console.log(user)
      console.log(users)
      console.log(buser)
      console.log(err)
      done(err, buser) 
    }
    users.findByID(id)
  })
}