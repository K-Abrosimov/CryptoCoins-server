const Router = require('express')
const ConversationModel = require('../model/Conversation')
const authMiddleware = require('../middlewares/auth.middleware')


const router = Router()

router.get('/conversation', authMiddleware, async (req, res, next) => {
    try {
        const conversation = await ConversationModel.find({
            members: {
                $in: [req.user.id]
            }
        })

        if (conversation.length === 0) {
            const newConversation = new ConversationModel({
                members: [req.user.id, "635cdc9527408a3a95502a9c"],
            })
            await newConversation.save()
             conversation = await ConversationModel.find({
                members: {
                    $in: [req.user.id]
                }
            })
        }
        return res.json({ conversation, resultCode: 0 })
    } catch (error) {
        next(error)
    }
})

module.exports = router