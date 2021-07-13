const express = require('express')
const router = express.Router()
const Artist = require('../models/artist')
const Publication = require('../models/publication')
const Institution = require('../models/institution')


router.get('/', async (req, res) => {
  try {
    const artists = await Artist.find({}).sort('name').exec()
    const publications =  await Publication.find({}).sort('name').populate('artists').exec()
    const institutions =  await Institution.find({}).sort('name').populate('artists').exec()
    // const link = new Link()
    res.render('./admin/edit', { artists, publications, institutions })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.put('/artists/:id', async (req, res) => {
  let artist
  try {
    artist = await Artist.findById(req.params.id)
    artist.name = req.body.artistName.trim()
    await artist.save()
    req.flash('success_msg', 'Success Updating Artist')
    res.redirect('/edit')
  } catch (error) {
    console.error(error)
    req.flash('error_msg', 'Error Updating Artist')
    res.redirect('/edit')
  }
})

router.put('/publications/:id', async (req, res) => {
  let publication
  try {
    publication = await Publication.findById(req.params.id)
    const publicationArtists = req.body.publicationArtists
    publication.name = req.body.publicationName.trim()
    checkInputType(publication, publicationArtists)
    publication.artists = publicationArtists
    await publication.save()
    req.flash('success_msg', 'Success Updating publication')
    res.redirect('/edit')
  } catch (error) {
    console.error(error)
    req.flash('error_msg', 'Error Updating publication')
    res.redirect('/edit')
  }
})

router.put('/institutions/:id', async (req, res) => {
  let institution
  try {
    institution = await Institution.findById(req.params.id)
    const institutionArtists = req.body.institutionArtists
    institution.name = req.body.institutionName.trim()
    checkInputType(institution, institutionArtists)
    institution.artists = institutionArtists
    await institution.save()
    req.flash('success_msg', 'Success Updating institution')
    res.redirect('/edit')
  } catch (error) {
    console.error(error)
    req.flash('error_msg', 'Error Updating institution')
    res.redirect('/edit')
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