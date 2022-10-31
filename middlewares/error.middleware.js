const ApiError = require('../exeptions/ApiError')

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors, resultCode: 1 })
    }
    return res.status(500).json({message:err.message,resultCode:1})
}