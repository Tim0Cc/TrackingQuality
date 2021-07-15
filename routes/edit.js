const express = require('express')
const router = express.Router()
const Artist = require('../models/artist')
const Publication = require('../models/publication')
const Institution = require('../models/institution')
const Link = require('../models/link')

// LINKS GET & PUT

router.get('/links', async (req, res) => {
  try {
    const artists = await Artist.find({}).sort('name').exec()
    const publications =  await Publication.find({}).sort('name').exec()
    const institutions =  await Institution.find({}).sort('name').exec()
    const links =  await Link.find({}).sort('name').populate('artists').populate('publications').populate('institutions').exec()
    res.render('./admin/edit_links', { artists, publications, institutions, links })
  } catch (error) {
    console.error(error)
    res.redirect('/')
  }
})

router.put('/links/:id', async (req, res) => {
  let link
  try {
    link = await Link.findById(req.params.id)
    link.title = req.body.title.trim()
    link.description = req.body.description.trim()
    link.linkUrl = req.body.linkUrl.trim()
    link.linkType = req.body.linkType
    const linkArtists = req.body.linkArtists
    checkInputTypeOfArtists(link, linkArtists)
    link.artists = linkArtists
    const linkPublications = req.body.linkPublications
    checkInputTypeOfPublications(link, linkPublications)
    link.publications = linkPublications
    const linkInstitutions = req.body.linkInstitutions
    checkInputTypeOfInstitutions(link, linkInstitutions)
    link.institutions = linkInstitutions
    await link.save()
    req.flash('success_msg', 'Success Updating link')
    res.redirect('/edit/links')
  } catch (error) {
    console.error(error)
    req.flash('error_msg', 'Error Updating link')
    res.redirect('/edit/links')
  }
})

// OTHERS GET & PUT

router.get('/', async (req, res) => {
  try {
    const artists = await Artist.find({}).sort('name').exec()
    const publications =  await Publication.find({}).sort('name').populate('artists').exec()
    const institutions =  await Institution.find({}).sort('name').populate('artists').exec()
    // const links =  await Institution.find({}).sort('name').populate('artists').populate('publications').populate('institutions').exec()
    res.render('./admin/edit', { artists, publications, institutions })
  } catch (error) {
    console.error(error)
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
    publication.name = req.body.publicationName.trim()
    const publicationArtists = req.body.publicationArtists
    checkInputTypeOfArtists(publication, publicationArtists)
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
    institution.name = req.body.institutionName.trim()
    const institutionArtists = req.body.institutionArtists
    checkInputTypeOfArtists(institution, institutionArtists)
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