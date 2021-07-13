const express = require('express')
const router = express.Router()
const Artist = require('../models/artist')
const Publication = require('../models/publication')
const Institution = require('../models/institution')

router.get('/', async (req, res) => {
  const artist = new Artist()
  const publication =  new Publication()
  const institution = new Institution()
  // const link = new Link()
  try {
    const artists = await Artist.find({}).sort('name').exec()
    res.render('./admin/new', { artist, publication, institution, artists })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.post('/artist', async (req, res) => {
  const artist = new Artist({
    name: req.body.artistName.trim()
  })
  try {
    await artist.save()
    req.flash('success_msg', 'Success creating Artist')
    res.redirect('/create')
  } catch (error) {
    console.error(error)
    req.flash('error_msg', 'Error creating Artist')
    res.redirect('/create')
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
    req.flash('success_msg', 'Success creating Publication')
    res.redirect('/create')
  } catch (error) {
    console.error(error)
    req.flash('error_msg', 'Error creating Publication')
    res.redirect('/create')
  }
})

router.post('/institution', async (req, res) => {
  const institution = new Institution({
    name: req.body.institutionName.trim()
  })
  const institutionArtists = req.body.institutionArtists
  checkInputType(institution, institutionArtists)
  try {
    await institution.save()
    req.flash('success_msg', 'Success creating Institution')
    res.redirect('/create')
  } catch (error) {
    console.error(error)
    req.flash('error_msg', 'Error creating Institution')
    res.redirect('/create')
  }
})

function checkInputType(instance, instanceArtists) {
  if (instanceArtists != undefined) {
    typeof instanceArtists == 'string' ? instance.artists.push(instanceArtists) : pushInstanceArtistsArray(instance, instanceArtists)
  }
}

function pushInstanceArtistsArray(instance, instanceArtists) {
  instanceArtists.forEach(instanceArtist => {
    instance.artists.push(instanceArtist)
  })
}

module.exports = router