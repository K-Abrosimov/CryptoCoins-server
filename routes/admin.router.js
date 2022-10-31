const Router = require('express')
const adminController = require('../controllers/admin.controller')

const authMiddleware = require('../middlewares/auth.middleware')
const roleMiddleware = require('../middlewares/role.middleware')

const router = Router()

router.get('/acsess',authMiddleware,roleMiddleware(['ADMIN']),adminController.getAcsess)
router.post('/addinfo',authMiddleware,roleMiddleware(['ADMIN']),adminController.addInvestInfo)
router.get('/getinfo',authMiddleware,roleMiddleware(['ADMIN']),adminController.getInvestinfo)
router.post('/updateinfo',authMiddleware,roleMiddleware(['ADMIN']),adminController.updateInfo)
router.post('/deleteinfo',authMiddleware,roleMiddleware(['ADMIN']),adminController.deleteInfo)

module.exports = router