module.exports = class ApiError extends Error {

    status;
    resultCode = 1;
    errors;

    constructor(status,message,errors = []){
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static badRequest(message,errors = []){
        return new ApiError(400,message,errors)
    }

    static UnauthorizedError(){
        return new ApiError(401,'User not authorized')
    }

    static acsessError(){
        return new ApiError(403,'Acsess Error')
    }

}