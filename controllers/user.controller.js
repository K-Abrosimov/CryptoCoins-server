const { validationResult } = require('express-validator')
const ApiError = require('../exeptions/ApiError')
const userService = require('../services/user.service')


class userController {
    async registration(req, res, next) {
        try {
            const result = validationResult(req)
            if (!result.isEmpty()) {
                throw ApiError.badRequest('Validation Error', result.array())
            }
            const { email, password } = req.body
            const userData = await userService.registration(email.toLowerCase(), password)

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json({ ...userData, resultCode: 0 })
        } catch (error) {
            next(error)
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const userData = await userService.login(email.toLowerCase(), password)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json({ ...userData, resultCode: 0 })
        } catch (error) {
            next(error)
        }
    }
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const tokenData = userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json({ tokenData, resultCode: 0 })

        } catch (error) {
            next(error)
        }

    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const userData = await userService.refresh(refreshToken)

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json({ ...userData, resultCode: 0 })
        } catch (error) {
            next(error)
        }
    }
    async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            await userService.activate(activationLink)

            return res.redirect(process.env.CLIENT_URL + '/createprofile')
        } catch (error) {
            next(error)
        }
    }
    async sendlink(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            await userService.sendlink(refreshToken)
            return res.status(200).json({ message: 'Link sended',resultCode:0 })
        } catch (error) {
            next(error)
        }
    }
}



module.exports = new userController();