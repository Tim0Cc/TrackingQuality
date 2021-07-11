const express = require('express')
const router = express.Router()
const Publication = require('../models/publication')

router.post('/', async (req, res) => {
  const publicationArtists = req.body.publicationArtists
  const publication = new Publication({
    name: req.body.publicationName.trim()
  })
  publicationArtists.forEach(publicationArtist => {
    publication.artists.push(publicationArtist)
  })
  console.log(publication)
  try {
    await publication.save()
    res.redirect('../changes/new' )
  } catch (error) {
    console.error(error)
    res.render('../changes/new', { 
      publication: publication,
      errorMessage: 'Error creating publication'
    })
  }
})

module.exports = router