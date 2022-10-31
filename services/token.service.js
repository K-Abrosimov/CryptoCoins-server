const jwt = require('jsonwebtoken')
const TokenModel = require('../model/Token')

    class tokenService {

        generateToken(payload){
            const acsessToken = jwt.sign(payload,process.env.JWT_ACSESS_SECRET,{expiresIn:'15m'})
            const refreshToken = jwt.sign(payload,process.env.JWT_REFRESH_SECRET,{expiresIn:'30d'})
            return {
                acsessToken,
                refreshToken,
            }
        }
        async saveToken(userId,refreshToken){
            const condidate = await TokenModel.findOne({userId})
  
            if(condidate){
                condidate.refreshToken = refreshToken
                return await condidate.save(); 
            }
            const tokenData = await TokenModel.create({userId,refreshToken})
            return tokenData
        }
        async removeToken(refreshToken){
            const tokenData = await TokenModel.deleteOne({refreshToken})
            return tokenData
        }
        
        async validateAcsessToken(token){
            try {  
                const userData = jwt.verify(token,process.env.JWT_ACSESS_SECRET)
                return userData
            } catch (e) {
               return null 
            }
        }
        async validateRefreshToken(token){
            try {
                const userData = jwt.verify(token,process.env.JWT_REFRESH_SECRET)
                return userData
            } catch (e) {
                return null
            }
        }
        async findToken(refreshToken){
                const tokenData = await TokenModel.findOne({refreshToken})
                return tokenData
        }   
    }
    
    
    module.exports = new tokenService()
