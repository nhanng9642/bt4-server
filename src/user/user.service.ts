import { HttpException, Injectable, UseFilters } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import SignUpDto from './signup.dto';
import * as bcrypt from 'bcrypt';
import ExistedEmailError from '../exceptions/ExistedEmailError';
import { HttpExceptionFilter } from 'src/exceptions/httpException.filter';
import { RegisterResponse } from './register.response';

@Injectable()
@UseFilters(new HttpExceptionFilter() )
export class UserService {
    constructor(@InjectModel(User.name) private userModel : Model<User>) {}

    async create(signUpDto : SignUpDto) {
        const {email, password, confirmPassword} = signUpDto;

        if (password !== confirmPassword) {
            throw new HttpException('Password and confirm password do not match', 400);
        }

        const salt = 10;
        const hashPassword = await bcrypt.hash(password, salt);

        const existedUser = await this.userModel.findOne({ email });
        if (existedUser) {
            throw new ExistedEmailError('Email already exists');
        }

        const user = new this.userModel({ email, password: hashPassword });

        user.save();

        return new RegisterResponse(email);
    }
}
