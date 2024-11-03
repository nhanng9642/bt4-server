import { Controller, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { Get } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @UseGuards(AuthGuard)
    async getProfile(@Request() req) {
        return this.userService.getProfile(req.user);
    }
}