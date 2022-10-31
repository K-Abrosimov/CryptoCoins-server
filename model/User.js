const {Schema,model} = require('mongoose')

const UserSchema = new Schema({
    email:{type:String,requred:true,unique:true},
    password:{type:String,required:true},
    roles: [{type:String,ref:'Role'}],
    isActivated:{type:Boolean,default:false},
    activationLink:{type:String}
})

module.exports = model('User',UserSchema);

