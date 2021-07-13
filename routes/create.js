const express = require('express')
const router = express.Router()
const Artist = require('../models/artist')
const Publication = require('../models/publication')

router.get('/', async (req, res) => {
  const artist = new Artist()
  const publication =  new Publication()
  // const link = new Link()
  try {
    const artists = await Artist.find({}).sort('name').exec()
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
  checkInputType(publication, publicationArtists)
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

function checkInputType(publication, publicationArtists) {
  if (publicationArtists != undefined) {
    typeof publicationArtists == 'string' ? publication.artists.push(publicationArtists) : pushArray(publication, publicationArtists)
  }
}

function pushArray(pub, pubArtists) {
  pubArtists.forEach(publicationArtist => {
    pub.artists.push(publicationArtist)
  })
}

module.exports = router