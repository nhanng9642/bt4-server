export class RegisterResponse {
    message: string;
    email: string;

    constructor(email: string) {
        this.message = 'User registered successfully';
        this.email = email;
    }
}