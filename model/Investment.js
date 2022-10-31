const {Schema,model} = require('mongoose')

const InvestmentSchema = new Schema({
    date:{type:Date,default:new Date()},
    coin_name:{type:String},
    invest_period:{type:String},
    open_order:{type:String},
    recommendation:{type:String},
    new_order:{type:String},
    target_line:{type:String},
    stop_line:{type:String} ,
    description:{type:String}  
})


module.exports = model('Investment',InvestmentSchema)