const express = require('express')
const router = express.Router()
const Artist = require('../models/artist')
const Publication = require('../models/publication')

router.delete('/artists/:id', async (req, res) => {
  let artist
  try {
    artist = await Artist.findById(req.params.id)
    artistPublications = await Publication.findOne({ artists: artist.id })
    if (artistPublications != null) {
      req.flash('error_msg', 'Artist still has Publications connected')
      return res.redirect('/update')
    }
    await artist.remove()
    res.redirect('/update')
  } catch (error) {
    console.error(error)
    res.redirect('/')
  }
})


module.exports = router