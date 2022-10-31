const moment = require('moment')

module.exports = class ProfileDto {
    subscriptionStart;
    subscriptionTerm;
    isSubscribed;
    userId;
    fullName;
    photo;
    aboutMe;
    status;
    phone;
    socialNetworks;
    stripeId;

    constructor(model) {
        this.userId = model.userId
        this.stripeId = model.stripeId
        this.fullName = model.fullName
        this.photo = model.photo
        this.aboutMe = model.aboutMe
        this.status = model.status
        this.phone = model.phone
        this.socialNetworks = model.socialNetworks
        this.subscriptionStart = moment(model.subscriptionStart).format("YYYY ddd MMM DD HH:mm")
        this.subscriptionTerm = moment(model.subscriptionTerm).format("YYYY ddd MMM DD HH:mm")
        if (model.subscriptionTerm > new Date()) {
            this.isSubscribed = true
        }
        else this.isSubscribed = false
    }
}