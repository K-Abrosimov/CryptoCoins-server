const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const ProfileModel = require('../model/Profile')
const profileService = require('./profile.service')


class paymentService {

    async createStripeCustomer(user) {

        const profile = await ProfileModel.findOne({ userId: user.id })
        if (profile.stripeId) {
            return profile.stripeId
        }
        const customer = await stripe.customers.create({
            email: user.email,
            name: profile.fullName,
            phone: profile.phone,
            metadata: {
                cryptoCoinsId: user.id
            }
        });
        if (!customer) {
            throw new Error('Stripe client creating error')
        }
        profile.stripeId = customer.id
        await profile.save()

        return customer.id
    }
    async createCheckoutSession(customer, priceId) {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            metadata: {
                period: '1'
            },
            customer,
            locale: 'en',
            success_url: `${process.env.CLIENT_URL}`,
            cancel_url: `${process.env.CLIENT_URL}/subscribe`,
        });
        return { url: session.url }

    }
    async webhook(sig, body) {
        let event;
        try {
            event = await stripe.webhooks.constructEvent(body, sig, process.env.END_POINT_SECRET);
        } catch (err) {
            throw new Error(`Webhook Error: ${err.message}`)
        }
        if (event.type === 'payment_intent.succeeded') {
            console.log(event.data.object)
            await profileService.customerSubscribed(event.data.object)
        }
    }
}

module.exports = new paymentService()