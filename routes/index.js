const express = require('express')
const router = express.Router()

router.get('/', async (req, res) =>{
  try {
    res.render('index')
  } catch (error) {
    console.error(error)
    res.redirect('/admin/error')
  }
})

module.exports = router