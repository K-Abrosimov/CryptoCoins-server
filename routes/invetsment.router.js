const Router = require('express')
const investmentController = require('../controllers/investment.controller')
const authModdleware = require('../middlewares/auth.middleware')


const router = Router()

router.get('/investment',authModdleware,investmentController.getInvestmentData)

module.exports  = router