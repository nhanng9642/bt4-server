export class ApiError extends Error {
    timestamp: Date;

    constructor(message: string, public statusCode: number) {
        super(message);
        this.timestamp = new Date();
    }
}