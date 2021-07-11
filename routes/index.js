const express = require('express')
const router = express.Router()
const Artist = require('../models/artist')
const Publication = require('../models/publication')
// const passport = require('passport')

// const { ensureAuthenticated } = require('../config/auth')

router.get('/', async (req, res) =>{
  try {
    const artists = await Artist.find({})
    const publications = await Publication.find({}).populate('artists').exec()
    res.render('index', { artists, publications })
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