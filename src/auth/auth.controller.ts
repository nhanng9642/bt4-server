import { Controller, HttpCode, HttpStatus, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Body, Post } from '@nestjs/common';
import SignUpDto  from '../user/signup.dto';
import { LoginDto } from 'src/user/login.dto';
import { ApiExceptionFilter } from 'src/exceptions/httpException.filter';

@Controller('user')
@UseFilters(ApiExceptionFilter)
export class AuthController {
    constructor(private readonly authService : AuthService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post("/register")
    async signUp(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post("/login")
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

}
