const {Schema,model} = require('mongoose')

const MessageSchema = new Schema({
    conversationId:{
        type:String
    },
    sender:{
        type:String
    },
    author:{
        type:String,
    },
    avatar:{
        type:String
    },
    text:{
        type:String
    },
},{timestamps:true})

module.exports = model('Message',MessageSchema)