const express = require('express')
const router = express.Router()
const Artist = require('../models/artist')

router.post('/', async (req, res) => {
  const artist = new Artist({
    name: req.body.artistName.trim()
  })
  console.log(artist)
  try {
    await artist.save()
    res.redirect('../changes/new' )
  } catch (error) {
    console.error(error)
    res.render('../changes/new', { 
      artist: artist,
      errorMessage: 'Error creating Artist'
    })
  }
})

module.exports = router