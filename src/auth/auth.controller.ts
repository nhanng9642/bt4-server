import { Controller, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Body, Post } from '@nestjs/common';
import SignUpDto  from '../user/signup.dto';

@Controller('user')
export class AuthController {
    constructor(private readonly authService : AuthService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post("/register")
    async signUp(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto);
    }

}
