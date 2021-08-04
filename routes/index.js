const express = require('express')
const router = express.Router()
const Artist = require('../models/artist')
const Publication = require('../models/publication')
const Institution = require('../models/institution')
const Link = require('../models/link')

router.get('/', async (req, res) =>{
  try {
    res.render('index', { mailadress: process.env.MAILADRESS })
  } catch (error) {
    console.error(error)
    res.redirect('/admin/error')
  }
})

router.get('/artists', async (req, res) =>{
  try {
    const artists = await Artist.find({}).sort('name').exec()
    const publications =  await Publication.find({}).sort('name').populate('artists').exec()
    const institutions =  await Institution.find({}).sort('name').populate('artists').exec()
    const links =  await Link.find({}).sort('title').populate('artists').populate('publications').populate('institutions').exec()
    res.render('../public/pages/artists', { artists, publications, institutions, links, mailadress: process.env.MAILADRESS })
  } catch (error) {
    console.error(error)
    res.redirect('/')
  }
})

router.get('/publications', async (req, res) =>{
  try {
    const artists = await Artist.find({}).sort('name').exec()
    const publications =  await Publication.find({}).sort('name').populate('artists').exec()
    const institutions =  await Institution.find({}).sort('name').populate('artists').exec()
    const links =  await Link.find({}).sort('title').populate('artists').populate('publications').populate('institutions').exec()
    res.render('../public/pages/publications', { artists, publications, institutions, links, mailadress: process.env.MAILADRESS })
  } catch (error) {
    console.error(error)
    res.redirect('/')
  }
})

router.get('/institutions', async (req, res) =>{
  try {
    const artists = await Artist.find({}).sort('name').exec()
    const publications =  await Publication.find({}).sort('name').populate('artists').exec()
    const institutions =  await Institution.find({}).sort('name').populate('artists').exec()
    const links =  await Link.find({}).sort('title').populate('artists').populate('publications').populate('institutions').exec()
    res.render('../public/pages/institutions', { artists, publications, institutions, links, mailadress: process.env.MAILADRESS })
  } catch (error) {
    console.error(error)
    res.redirect('/')
  }
})

router.get('/impressum', (req, res) =>{
  res.render('../public/pages/impressum', { mailadress: process.env.MAILADRESS })
})
router.get('/datenschutz', (req, res) =>{
  res.render('../public/pages/datenschutz', { mailadress: process.env.MAILADRESS })
})

module.exports = router