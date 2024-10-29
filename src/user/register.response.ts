export class RegisterResponse {
    message: string;
    email: string;
    success: boolean;
    
    constructor(email: string) {
        this.message = 'User registered successfully';
        this.email = email;
        this.success = true;
    }
}