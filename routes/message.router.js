const Router = require('express')
const MessageModel = require('../model/Message')
const authMiddleware = require('../middlewares/auth.middleware')

const router = Router();

router.post('/message',authMiddleware,async (req,res,next)=>{

    
    const newMassage = new MessageModel(req.body)


    try {
        
const savedMassege = await newMassage.save()

return res.json({savedMassege,resultCode:0})

    } catch (error) {
        next(error)
    }
})

router.get('/message/:conversataionId',authMiddleware,async (req,res,next)=>{
    try {
        const messages = await MessageModel.find({
            conversationId:req.params.conversataionId
        })

        return res.json({messages,resultCode:0})
    } catch (error) {
        next(error)
    }
})

module.exports = router;