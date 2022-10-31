const {Schema,model} = require('mongoose')

const RoleSchema = new Schema({
   value:{type:String,unique:true,default:'ADMIN'}
})

module.exports = model('Role', RoleSchema)