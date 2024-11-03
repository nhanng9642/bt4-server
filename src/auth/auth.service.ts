import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import SignUpDto from 'src/user/signup.dto';
import { LoginDto } from 'src/user/login.dto';
import { JwtService } from '@nestjs/jwt';
import ExistedEmailError from 'src/exceptions/ExistedEmailError';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    
    ) {}

    async signUp(signUpDto : SignUpDto) {
        return this.userService.create(signUpDto);
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new ExistedEmailError();
        }

        if (!await bcrypt.compare(password, user.password)) {
            throw new Error('Password is not correct');
        }
        
        const token = await this.jwtService.signAsync({email});

        return {
            user,
            token
        }
    }
}
