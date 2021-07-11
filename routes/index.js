const express = require('express')
const router = express.Router()
const Artist = require('../models/artist')
// const passport = require('passport')

// const { ensureAuthenticated } = require('../config/auth')

router.get('/', async (req, res) =>{
  try {
    const artists = await Artist.find({})
    res.render('index', { artists })
  } catch (error) {
    console.error(error)
    res.redirect('/error')
  }
})

router.get('/error', async (req, res) =>{
  res.render('error')
})

// router.get('/test', ensureAuthenticated, (req, res) =>{
//   res.render('test')
// })

module.exports = router