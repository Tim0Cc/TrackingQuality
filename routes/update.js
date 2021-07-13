const express = require('express')
const router = express.Router()
const Artist = require('../models/artist')
const Publication = require('../models/publication')


router.get('/', async (req, res) => {
  try {
    const artists = await Artist.find({}).sort('name').exec()
    const publications =  await Publication.find({}).sort('name').populate('artists').exec()
    // const link = new Link()
    res.render('./admin/updatedelete', { artists, publications })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})
router.get('/', (req, res) => {

})

module.exports = router