const express = require('express')
const router = express.Router()

router.get('/', async (req, res) =>{
  try {
    res.render('index', { mailadress: process.env.MAILADRESS })
  } catch (error) {
    console.error(error)
    res.redirect('/admin/error')
  }
})

router.get('/impressum', (req, res) =>{
  res.render('../public/pages/impressum', { mailadress: process.env.MAILADRESS })
})
router.get('/datenschutz', (req, res) =>{
  res.render('../public/pages/datenschutz', { mailadress: process.env.MAILADRESS })
})

module.exports = router