const express = require('express')
const router = express.Router()
const Publication = require('../models/publication')

router.post('/', async (req, res) => {
  const publication = new Publication({
    name: req.body.publicationName
  })
  console.log(publication)
  try {
    await publication.save()
    res.redirect('../changes/new' )
  } catch (error) {
    console.error(error)
    res.render('../changes/new', { 
      publication: publication,
      errorMessage: 'Error creating publication'
    })
  }
})

module.exports = router