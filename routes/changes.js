const express = require('express')
const router = express.Router()
const Artist = require('../models/artist')
const Publication = require('../models/Publication')
// const Link = require('../models/Link')

router.get('/new', (req, res) => {
  const artist = new Artist()
  const publication =  new Publication()
  // const link = new Link()
  const link = ''
  res.render('new', { artist, publication, link })
})

module.exports = router