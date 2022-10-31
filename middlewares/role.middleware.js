const ApiError = require("../exeptions/ApiError")

module.exports = function (roles) {

    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            const userRole = req.user.roles
            let hasRole = false
            userRole.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true
                }
            });

            if (!hasRole) {
                throw ApiError.acsessError()
            }
            next()
        } catch (error) {
            throw ApiError.acsessError()
        }
    }
}
