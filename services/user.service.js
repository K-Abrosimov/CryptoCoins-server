const UserModel = require('../model/User')
const RoleModel = require('../model/Role')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const UserDto = require('../dtos/user.dto')
const tokenService = require('./token.service')
const mailservice = require('./mail.service')
const ApiError = require('../exeptions/ApiError')
const profileService = require('./profile.service')


class userService {
    async registration(email, password) {

        const condidate = await UserModel.findOne({ email })
        if (condidate) {
            throw ApiError.badRequest(`User ${email} alredy registred`)
        }
        const hashPassword = bcrypt.hashSync(password, 3)
        const activationLink = uuid.v4()
        const userRole = await RoleModel.findOne({ value: 'USER' })
        const user = await UserModel.create({email,password:hashPassword,activationLink,roles: [userRole.value]})
        await mailservice.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)
        await profileService.createProfile(user._id)
        const userData = new UserDto(user)
        const tokens = tokenService.generateToken({ ...userData })
        await tokenService.saveToken(userData.id, tokens.refreshToken)
        return { ...tokens, user: userData }
    }
    async login(email, password) {

        const user = await UserModel.findOne({ email })
        if (!user) {
            throw ApiError.badRequest(`User ${email} not found`)
        }
        const comparePass = bcrypt.compareSync(password, user.password)
        if (!comparePass) {
            throw ApiError.badRequest('Invalid password or email address')
        }

        const userData = new UserDto(user);
        const tokens = tokenService.generateToken({ ...userData })
        await tokenService.saveToken(userData.id, tokens.refreshToken)
        
        return { ...tokens, user: userData }
    }
    async logout(refreshToken) {
        const tokenData = tokenService.removeToken(refreshToken)
        return tokenData
    }
    async refresh(refreshToken) {

        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = await tokenService.validateRefreshToken(refreshToken)

        const tokenFromDb = tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }
        const user = await UserModel.findById(userData.id)
        const userDto = new UserDto(user);

        const tokens = await tokenService.generateToken({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto }
    }
    async activate(activationLink) {
        const user = await UserModel.findOne({ activationLink })
        if (!user) {
            throw new Error('Activation link is not valid')
        }
        user.isActivated = true
        await user.save()

        return user
    }
    async sendlink(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = await tokenService.validateRefreshToken(refreshToken)
        if (!userData) {
            throw ApiError.UnauthorizedError()
        }
        const user = await UserModel.findById(userData.id)

        if (!user) {
            throw ApiError.UnauthorizedError()
        }
        await mailservice.sendActivationMail(userData.email, `${process.env.API_URL}/api/activate/${user.activationLink}`)
    }
}

module.exports = new userService();