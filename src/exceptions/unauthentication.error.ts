import { ApiError } from "./ApiError";

export class UnauthorizedError extends ApiError {
    constructor(error?: string, code?: number) {
        super(error, code || 401);
    }
}