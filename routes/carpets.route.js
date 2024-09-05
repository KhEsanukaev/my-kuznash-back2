const { Router } = require('express')
const { carpetsController } = require('../controllers/carpets.controller')

const router = Router()

router.get('/carpet', carpetsController.getCarpets)
router.post('/carpet', carpetsController.addCarpets)
router.delete('/carpet', carpetsController.deleteCarpets)



module.exports = router