const Router = require('express')
const userController = require('../controllers/user.controller')
const { body } = require('express-validator')
const RoleModel = require('../model/Role')



const router = Router()

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 5, max: 15 }),
    userController.registration)

router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.get('/activate/:link', userController.activate)
router.get('/sendlink',userController.sendlink)
router.get('/createmodel', async (req,res)=>{
   const role = await RoleModel.create({}) 
   console.log(role)
  
    res.json({ok:'ok'})
})

module.exports = router