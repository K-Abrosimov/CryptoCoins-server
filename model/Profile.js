const {Schema,model} = require('mongoose')


const ProfileSchema = new Schema({
    userId:{type:Schema.Types.ObjectId,ref:'User'},
    fullName:{type:String,default:null},
    photo:{type:String,default:null},
    aboutMe: {type:String,default:null},
    status:{type:String,default:"Press to change status"},
    phone:{type:String,default:null},
    socialNetworks:{
        youtube:{type:String,default:null},
        facebook:{type:String,default:null},
        instagram:{type:String,default:null},
        twitter:{type:String,default:null},     
    },
    stripeId:{type:String,default:null},
    subscriptionStart:{type:Date,default:null},
    subscriptionTerm:{type:Date,default:null},
},{minimize:false})



module.exports = model('Profile',ProfileSchema)