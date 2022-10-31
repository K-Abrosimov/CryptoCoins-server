const moment = require('moment')

class investmentDto {
    id;
    date;
    coin_name;
    invest_period;
    open_order;
    recommendation;
    new_order;
    target_line;
    stop_line;
    description;
    
    
    constructor(investmentData){
        this.id = investmentData._id
        this.date = moment(investmentData.date).format("YYYY ddd MMM DD HH:mm")
        this.coin_name = investmentData.coin_name
        this.invest_period = investmentData.invest_period
        this.open_order = investmentData.open_order
        this.recommendation = investmentData.recommendation
        this.new_order = investmentData.new_order
        this.target_line = investmentData.target_line
        this.stop_line = investmentData.stop_line
        this.description = investmentData.description
    }
}

module.exports = investmentDto