const tokenService = require('../services/token.service')
const ApiError = require('../exeptions/ApiError')

module.exports = async function(req,res,next){
    try {
        const authorizationHeader = req.headers.authorization
 
        if(!authorizationHeader){
            return next(ApiError.UnauthorizedError())
        }
        const acsessToken = authorizationHeader.split(' ')[1]

        if(!acsessToken){   
            return next(ApiError.UnauthorizedError())
        }
        
        const userData = await tokenService.validateAcsessToken(acsessToken)  
      
        if(!userData){          
            return next(ApiError.UnauthorizedError())
        }
        req.user = userData
        next()

    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}