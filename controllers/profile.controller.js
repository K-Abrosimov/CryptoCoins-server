const profileService = require("../services/profile.service")


class profileController {

    async getProfile(req, res, next) {
        try {
            const user = req.user

            const profile = await profileService.getProfile(user.id)

            res.json({ profile, resultCode: 0 })
        } catch (error) {
            next(error)
        }
    }
    async updateProfile(req, res, next) {
        try {
            const user = req.user
            const { payload } = req.body
            const profile = await profileService.updateProfile(user, payload)

            res.json({ profile, resultCode: 0 })

        } catch (error) {
            next(error)
        }
    }
    async uploadProfileImage(req, res, next) {
        try {
            const user = req.user
            const file = req.file
            const photo = await profileService.uploadProfileImage(user, file)

            return res.json(photo)
        } catch (error) {
            next(error);
        }
    }
    async updateStatus(req, res, next) {
        try {
            const { status } = req.body
            const user = req.user
            const profileStatus = await profileService.updateStatus(user, status)

            return res.json({ status: profileStatus, resultCode: 0 })
        } catch (error) {
            next(error)
        }
    }
    async getProfileById(req, res, next) {
        try {
            const { id } = req.params

            const user = await profileService.getProfile(id)



            return res.json({ user, resultCode: 0 })
        } catch (error) {
            next(error)
        }
    }
    async getUserProfiles(req, res, next) {
        try {
            const users = await profileService.getUserProfiles()
            return res.json({ users })

        } catch (error) {
            next(error)
        }
    }
}

module.exports = new profileController()