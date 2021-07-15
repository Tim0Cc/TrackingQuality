const express = require('express')
const router = express.Router()
const Artist = require('../models/artist')
const Publication = require('../models/Publication')
// const Link = require('../models/Link')

router.get('/', async (req, res) =>{
  try {
    res.render('./admin/admin', { mailadress: process.env.MAILADRESS })
  } catch (error) {
    console.error(error)
    res.redirect('/admin/error')
  }
})

router.get('/error', async (req, res) =>{
  res.render('error')
})

module.exports = router