class HttpException extends Error{
    constructor(message, statusCode) {
        super(message);
        this.message = message || "Inernal Server Error"
        this.statusCode = statusCode || 500
        Error.captureStackTrace(this,this.constructor)
        
    }
}

module.exports = {HttpException}