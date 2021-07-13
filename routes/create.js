const express = require('express')
const router = express.Router()
const Artist = require('../models/artist')
const Publication = require('../models/publication')

router.get('/', async (req, res) => {
  const artist = new Artist()
  const publication =  new Publication()
  // const link = new Link()
  try {
    const artists = await Artist.find({})
    res.render('./admin/new', { artist, publication, artists })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.post('/artist', async (req, res) => {
  const artist = new Artist({
    name: req.body.artistName.trim()
  })
  console.log(artist)
  try {
    await artist.save()
    res.redirect('/create')
  } catch (error) {
    console.error(error)
    res.render('./admin/new', { 
      artist: artist,
      errorMessage: 'Error creating Artist'
    })
  }
})

router.post('/publication', async (req, res) => {
  const publication = new Publication({
    name: req.body.publicationName.trim()
  })
  const publicationArtists = req.body.publicationArtists
  publicationArtists.forEach(publicationArtist => {
    publication.artists.push(publicationArtist)
  })
  console.log(publication)
  try {
    await publication.save()
    res.redirect('/create' )
  } catch (error) {
    console.error(error)
    res.render('./admin/create', { 
      publication: publication,
      errorMessage: 'Error creating publication'
    })
  }
})

module.exports = router