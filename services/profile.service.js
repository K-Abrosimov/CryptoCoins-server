const ProfileModel = require('../model/Profile')
const fs = require('fs')
const ProfileDto = require('../dtos/profile.dto')

class profileService {

    async getProfile(id) {
        const profile = await ProfileModel.findOne({ userId: id })
   
        if (!profile) {
            throw new Error('profile not found')
        }
        const profileDto = new ProfileDto(profile)


        return profileDto
    }
    async createProfile(id) {
   
        const profile = await ProfileModel.create({
            userId: id,
        })
        const profileDto = new ProfileDto(profile)
        return profileDto
    }
    async updateProfile(userData, payload) {
        const profile = await ProfileModel.findOne({ userId: userData.id })

        if (!profile) {
            throw new Error('Udate profile Error')
        }
        profile.fullName = payload.fullName,
            profile.aboutMe = payload.aboutMe,
            profile.status = payload.status,
            profile.phone = payload.phone,
            profile.socialNetworks.facebook = payload.facebook,
            profile.socialNetworks.twitter = payload.twitter,
            profile.socialNetworks.instagram = payload.instagram,
            profile.socialNetworks.youtube = payload.youtube

        await profile.save()
        const profileDto = new ProfileDto(profile)
        return profileDto
    }
    async uploadProfileImage(user, file) {
        if (!file) {
            throw new Error("upload file error")
        }
        const photo = `${process.env.API_URL}/${file.path}`
        const profile = await ProfileModel.findOne({ userId: user.id })

        try {
            fs.unlinkSync(profile.photo.substring(process.env.API_URL.length + 1))
        } catch (e) {
            console.log('no file directory')
        }
        profile.photo = photo
        await profile.save()
        return { photo: profile.photo }
    }
    async updateStatus(user, status) {
        const profile = await ProfileModel.findOne({ uderId: user.id })
        if (!profile) {
            throw new Error('Profile not found')
        }
        profile.status = status
        await profile.save()
        return status
    }
    async customerSubscribed(eventData) {

        let subscrimePeriod

        if (eventData.amount === 1000) {
            subscrimePeriod = 1
        }
        else if (eventData.amount === 2500) {
            subscrimePeriod = 3
        }
        if (eventData.amount === 4500) {
            subscrimePeriod = 6
        }

        let date = new Date()
        await ProfileModel.updateOne({ stripeId: eventData.customer }, {
            $set: { subscriptionStart: new Date(), subscriptionTerm: date.setMonth(date.getMonth() + subscrimePeriod) }
        })
    }
    async getUserProfiles(){
        const users = await ProfileModel.find()
        return users
    }
}
module.exports = new profileService()