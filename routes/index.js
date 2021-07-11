const express = require('express')
const router = express.Router()
const passport = require('passport')

const { ensureAuthenticated } = require('../config/auth')

router.get('/', (req, res) =>{
  res.render('index')
})

router.get('/test', ensureAuthenticated, (req, res) =>{
  res.render('test')
})

module.exports = router