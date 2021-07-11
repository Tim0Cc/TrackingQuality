const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/', (req, res) =>{
  res.render('login')
})

router.post('/', (req, res, next) => {
  // const users = [{
  //   name: process.env.USERNAME,
  //   userPassword: process.env.LOGIN_PASSWORD
  // }]
  // const findUser = function (users) {
  //   const user = users.find( ({name}) => name == req.body.username )
  //   console.log(user)
  //   return user
  // }
  // findUser(users).then((user) => {
    console.log(req.body.username)
    passport.authenticate('local', { 
      successRedirect: '/test',
      failureRedirect: '/login',
      failureFlash: true
    })(req, res, next)
  // })
})

module.exports = router