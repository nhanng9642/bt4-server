import { ApiError } from "./ApiError";

export class NotFoundUserWithEmail extends ApiError {
    constructor(email: string) {
        super(`Not found user with email ${email}`, 400);
    }
}