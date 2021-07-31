const express = require('express')
const router = express.Router()
const Artist = require('../models/artist')
const Publication = require('../models/publication')
const Institution = require('../models/institution')
const Link = require('../models/link')

const { ensureAuthenticated } = require('../config/auth')

router.delete('/links/:id', ensureAuthenticated, async (req, res) => {
  let link
  try {
    link = await Link.findById(req.params.id)
    await link.remove()
    req.flash('success_msg', 'Success deleting link')
    res.redirect('/edit/links')
  } catch (error) {
    console.error(error)
    req.flash('error_msg', 'Error deleting link')
    res.redirect('/edit/links')
  }
})

router.delete('/artists/:id', ensureAuthenticated, async (req, res) => {
  let artist
  try {
    artist = await Artist.findById(req.params.id)
    artistPublications = await Publication.findOne({ artists: artist.id })
    artistInstitutions = await Institution.findOne({ artists: artist.id })
    artistLinks = await Link.findOne({ artists: artist.id })
    if (artistPublications != null || artistInstitutions != null || artistLinks != null) {
      req.flash('error_msg', 'Artist still has Publications or Institutions or Links connected')
      return res.redirect('/edit')
    }
    await artist.remove()
    req.flash('success_msg', 'Success deleting Artist')
    res.redirect('/edit')
  } catch (error) {
    console.error(error)
    req.flash('error_msg', 'Error deleting Artist')
    res.redirect('/edit')
  }
})

router.delete('/publications/:id', ensureAuthenticated, async (req, res) => {
  let publication
  try {
    publication = await Publication.findById(req.params.id)
    publicationLinks = await Link.findOne({ publications: publication.id })
    if (publicationLinks != null) {
      req.flash('error_msg', 'Publication still has Links connected')
      return res.redirect('/edit')
    }
    await publication.remove()
    req.flash('success_msg', 'Success deleting Publication')
    res.redirect('/edit')
  } catch (error) {
    console.error(error)
    req.flash('error_msg', 'Error deleting Publication')
    res.redirect('/edit')
  }
})

router.delete('/institutions/:id', ensureAuthenticated, async (req, res) => {
  let institution
  try {
    institution = await Institution.findById(req.params.id)
    institutionLinks = await Link.findOne({ institutions: institution.id })
    if (institutionLinks != null) {
      req.flash('error_msg', 'institution still has Links connected')
      return res.redirect('/edit')
    }
    await institution.remove()
    req.flash('success_msg', 'Success deleting Institution')
    res.redirect('/edit')
  } catch (error) {
    console.error(error)
    req.flash('error_msg', 'Error deleting Institution')
    res.redirect('/edit')
  }
})

module.exports = router