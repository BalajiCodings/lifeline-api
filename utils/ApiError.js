
export default class ApiError extends Error {
    cpnstructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
    }
}
