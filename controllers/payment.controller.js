const paymentService = require('../services/payment.service');


class paymentController {

    async createCheckoutSession(req, res, next) {
        try {
            const user = req.user
            const { priceId } = req.body
            const customerId = await paymentService.createStripeCustomer(user)
            const url = await paymentService.createCheckoutSession(customerId, priceId)

            return res.json(url);

        } catch (error) {
            next(error)
        }
    }
    async webhook(req, res, next) {
        try {
            const sig = req.headers['stripe-signature']
            const body = req.body
            await paymentService.webhook(sig, body)
            res.json()

        } catch (error) {
            next(error)
        }
        res.send();
    }
}

module.exports = new paymentController()