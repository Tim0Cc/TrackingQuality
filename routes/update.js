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

router.put('/artists/:id', async (req, res) => {
  let artist
  try {
    artist = await Artist.findById(req.params.id)
    artist.name = req.body.artistName.trim()
    await artist.save()
    req.flash('success_msg', 'Success Updating Artist')
    res.redirect('/update')
  } catch (error) {
    console.error(error)
    req.flash('error_msg', 'Error Updating Artist')
    res.redirect('/update')
  }
})

module.exports = router