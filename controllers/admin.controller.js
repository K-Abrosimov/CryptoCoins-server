const InvestmentModel = require('../model/Investment')

class adminController {
    async getAcsess(req, res, next) {
        res.json({ acsess: true, resultCode: 0 })
    }

    async addInvestInfo(req, res, next) {
        try {
            const { investInfo } = req.body

            if (!investInfo) {
                throw new Error("Invest info data error")
            }
            const newInvestInfo = new InvestmentModel({
                coin_name: investInfo.coin_name,
                invest_period: investInfo.invest_period,
                open_order: investInfo.open_order,
                recommendation: investInfo.recommendation,
                new_order: investInfo.new_order,
                target_line: investInfo.target_line,
                stop_line: investInfo.stop_line,
                description: investInfo.description
            })
            newInvestInfo.save()
            res.json({ added: true, resultCode: 0 })
        } catch (error) {
            next(error)
        }
    }

    async getInvestinfo(req, res, next) {
        try {
            const investInfo = await InvestmentModel.find();
            if(!investInfo){
                throw new Error('Invest info not found')
            }
            res.json({ investInfo, resultCode: 0 })

        } catch (error) {
            next(error)
        }
    }

    async updateInfo(req, res, next) {
        try {
            const { investInfo } = req.body
            await InvestmentModel.updateOne({ _id: investInfo.id }, {
                $set: {
                    coin_name: investInfo.coin_name,
                    invest_period: investInfo.invest_period,
                    open_order: investInfo.open_order,
                    recommendation: investInfo.recommendation,
                    new_order: investInfo.new_order,
                    target_line: investInfo.target_line,
                    stop_line: investInfo.stop_line,
                    description: investInfo.description
                }
            })
            res.json({ updated: true, resultCode: 0 })
        } catch (error) {
            next(error)
        }
    }
    
    async deleteInfo(req, res, next) {
        try {
            const { id } = req.body
            const acknowledge = await InvestmentModel.findByIdAndDelete(id)
            res.json({ acknowledge, resultCode: 0 })
        } catch (error) {
            next(error)
        }
    }
}


module.exports = new adminController()