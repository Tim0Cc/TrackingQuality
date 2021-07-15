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

router.get('/artists', async (req, res) =>{
  try {
    res.render('../public/pages/artists', { mailadress: process.env.MAILADRESS })
  } catch (error) {
    console.error(error)
    res.redirect('/')
  }
})

router.get('/publications', async (req, res) =>{
  try {
    res.render('../public/pages/publications', { mailadress: process.env.MAILADRESS })
  } catch (error) {
    console.error(error)
    res.redirect('/')
  }
})

router.get('/institutions', async (req, res) =>{
  try {
    res.render('../public/pages/institutions', { mailadress: process.env.MAILADRESS })
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