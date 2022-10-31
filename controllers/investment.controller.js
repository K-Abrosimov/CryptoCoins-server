const investmentModel = require('../model/Investment')
const investmentDto = require('../dtos/investmentDto')

class investmentController {
    async getInvestmentData(req, res, next) {

        try {
            const invesmentsData = await investmentModel.find()
            if (!invesmentsData) {
                throw new Error('Data not found')
            }
            const investDto = invesmentsData.reverse().map(i => new investmentDto(i))
            res.json({ investDto, resultCode: 1 })

        } catch (error) {
            next(error)
        }
    }
}

module.exports = new investmentController()