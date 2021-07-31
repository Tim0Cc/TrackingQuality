const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')

router.get('/', async (req, res) =>{
  try {
    res.render('./admin/admin', { mailadress: process.env.MAILADRESS })
  } catch (error) {
    console.error(error)
    res.redirect('/admin/error')
  }
})

router.get('/error', async (req, res) =>{
  res.render('error', { mailadress: process.env.MAILADRESS })
})

// login handle
router.get('/login', (req, res) => {
  res.render('./admin/auth/login', { mailadress: process.env.MAILADRESS })
})

router.get('/register', (req, res) => {
  res.render('./admin/auth/register', { mailadress: process.env.MAILADRESS })
})

// register handle

router.post('/register', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const password2 = req.body.password2
  const registerToken = req.body.register_token
  let errors = [];
  if(!username || !password || !password2 || !registerToken) {
    errors.push({msg : "Please fill in all fields"})
  }
  // check register-token
  if(registerToken != process.env.REGISTER_TOKEN) {
    errors.push({msg: "Token incorrect"})
  } 
  //check if match
  if(password !== password2) {
      errors.push({msg : "passwords don't match"});
  }
  //check if password is more than 6 characters
  if(password.length < 6 ) {
      errors.push({msg : 'Das Passwort muss mindestens 6 Zeichen lang sein'})
  }
  if(errors.length > 0 ) {
    res.render('./admin/auth/register', {
      errors : errors,
      username : username,
      password : password,
      password2 : password2,
      register_token : registerToken,
      mailadress: process.env.MAILADRESS
    })
  } else {
    //validation passed
    User.findOne({username : username}).exec((err,user)=>{
      if(user) {
        errors.push({msg: 'username already registered'});
        res.render('./admin/auth/register', { errors,username,password,password2, mailadress:process.env.MAILADRESS });          
      } else {
        const newUser = new User({
          username : username,
          password : password,
          registerDate : Date.now()
        });
        bcrypt.genSalt(10, (err,salt) => bcrypt.hash(
          newUser.password, 
          salt, 
          (err,hash) => {
            if(err) throw err;
              //save pass to hash
              newUser.password = hash;
            //save user
            newUser.save()
            .then((value) => {
              req.flash('success_msg', 'registration success!')
              res.redirect('/admin/login');
            })
            .catch(value=> console.log(value));      
          }
        ));
      }
    })
  }
})

router.post('/login', (req, res, next) => {
  const user = User.findOne({username: req.body.username})
  .then((user) => {
    let path = '/admin'
    return path
  })
  .then((path) => {
    passport.authenticate('local', {
      successRedirect: path,
      failureRedirect: '/admin/login',
      failureFlash: true
    })(req, res, next)
  })
})

// logout

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'logout successfully')
  res.redirect('/admin/login')
})

module.exports = router