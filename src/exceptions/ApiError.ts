export class ApiError extends Error {
    timestamp: Date;
    success: Boolean = false;

    constructor(message: string, public statusCode: number) {
        super(message);
        this.timestamp = new Date();
    }
}