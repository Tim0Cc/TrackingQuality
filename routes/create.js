const express = require('express')
const router = express.Router()
const Artist = require('../models/artist')
const Publication = require('../models/publication')
const Institution = require('../models/institution')
const Link = require('../models/link')

router.get('/link', async (req, res) => {
  const link = new Link()
  try {
    const artists = await Artist.find({}).sort('name').exec()
    const publications =  await Publication.find({}).sort('name').exec()
    const institutions =  await Institution.find({}).sort('name').exec()
    res.render('./admin/links_new', { link, publications, institutions, artists })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.post('/link', async (req, res) => {
  const link = new Link({
    linkUrl: req.body.linkUrl.trim(),
    linkType: req.body.linkType
  })
  const linkArtists = req.body.linkArtists
  checkInputTypeOfArtists(link, linkArtists)
  const linkPublications = req.body.linkPublications
  checkInputTypeOfPublications(link, linkPublications)
  const linkInstitutions = req.body.linkInstitutions
  checkInputTypeOfInstitutions(link, linkInstitutions)
  try {
    await link.save()
    console.log(link)
    req.flash('success_msg', 'Success creating Link')
    res.redirect('/create/link')
  } catch (error) {
    console.error(error)
    req.flash('error_msg', 'Error creating Link')
    res.redirect('/create/link')
  }
})

router.get('/', async (req, res) => {
  const artist = new Artist()
  const publication =  new Publication()
  const institution = new Institution()
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
  checkInputTypeOfArtists(publication, publicationArtists)
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
  checkInputTypeOfArtists(institution, institutionArtists)
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

// PRIVATE METHODS

function checkInputTypeOfArtists(instance, instanceArtists) {
  if (instanceArtists != undefined) {
    typeof instanceArtists == 'string' ? instance.artists.push(instanceArtists) : pushInstanceArtistsArray(instance, instanceArtists)
  }
}
function pushInstanceArtistsArray(instance, instanceArtists) {
  instanceArtists.forEach(instanceArtist => {
    instance.artists.push(instanceArtist)
  })
}

// link references only:

function checkInputTypeOfPublications(instance, instancePublications) {
  if (instancePublications != undefined) {
    typeof instancePublications == 'string' ? instance.publications.push(instancePublications) : pushInstancePublicationsArray(instance, instancePublications)
  }
}
function pushInstancePublicationsArray(instance, instancePublications) {
  instancePublications.forEach(instancePublication => {
    instance.publications.push(instancePublication)
  })
}
function checkInputTypeOfInstitutions(instance, instanceInstitutions) {
  if (instanceInstitutions != undefined) {
    typeof instanceInstitutions == 'string' ? instance.institutions.push(instanceInstitutions) : pushInstanceInstitutionsArray(instance, instanceInstitutions)
  }
}
function pushInstanceInstitutionsArray(instance, instanceInstitutions) {
  instanceInstitutions.forEach(instanceInstitution => {
    instance.institutions.push(instanceInstitution)
  })
}

module.exports = router