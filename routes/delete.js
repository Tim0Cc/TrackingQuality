const express = require('express')
const router = express.Router()
const Artist = require('../models/artist')
const Publication = require('../models/publication')
const Institution = require('../models/institution')
const Link = require('../models/link')

router.delete('/links/:id', async (req, res) => {
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

router.delete('/artists/:id', async (req, res) => {
  let artist
  try {
    artist = await Artist.findById(req.params.id)
    artistPublications = await Publication.findOne({ artists: artist.id })
    artistInstitutions = await Institution.findOne({ artists: artist.id })
    artistLinks = await Link.findOne({ artists: artist.id })
    if (artistPublications != null || artistInstitutions != null || artistLinks != null) {
      req.flash('error_msg', 'Artist still has Publications or Institutions connected')
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

router.delete('/publications/:id', async (req, res) => {
  let publication
  try {
    publication = await Publication.findById(req.params.id)
    await publication.remove()
    req.flash('success_msg', 'Success deleting Publication')
    res.redirect('/edit')
  } catch (error) {
    console.error(error)
    req.flash('error_msg', 'Error deleting Publication')
    res.redirect('/edit')
  }
})

router.delete('/institutions/:id', async (req, res) => {
  let institution
  try {
    institution = await Institution.findById(req.params.id)
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