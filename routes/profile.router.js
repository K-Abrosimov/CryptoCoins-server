const Router = require('express')
const profileController = require('../controllers/profile.controller')
const uploadMiddleware = require('../middlewares/upload.middleware')
const authMiddleware = require('../middlewares/auth.middleware')

const router = Router()

router.get('/profile',authMiddleware,profileController.getProfile)
router.get('/profile/:id',authMiddleware,profileController.getProfileById)
//fedbrouter.get('/users',authMiddleware,profileController.getUserProfiles)

router.post('/profile/update',authMiddleware, profileController.updateProfile)
router.post('/profile/image',authMiddleware,uploadMiddleware.single('photo'),profileController.uploadProfileImage)
router.post('/profile/status',authMiddleware,profileController.updateStatus)


module.exports = router











