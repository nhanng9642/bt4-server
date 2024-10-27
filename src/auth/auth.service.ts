import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import SignUpDto from 'src/user/signup.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async signUp(signUpDto : SignUpDto) {
        return this.userService.create(signUpDto);
    }
}
