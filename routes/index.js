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

router.get('/impressum', (req, res) =>{
  res.render('../public/pages/impressum')
})
router.get('/datenschutz', (req, res) =>{
  res.render('../public/pages/datenschutz')
})

module.exports = router