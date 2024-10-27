import { HttpException, Injectable, UseFilters } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import SignUpDto from './signup.dto';
import * as bcrypt from 'bcrypt';
import ExistedEmailError from '../exceptions/ExistedEmailError';
import { HttpExceptionFilter } from 'src/exceptions/httpException.filter';

@Injectable()
@UseFilters(new HttpExceptionFilter() )
export class UserService {
    constructor(@InjectModel(User.name) private userModel : Model<User>) {}

    async create(signUpDto : SignUpDto) {
        const {email, password} = signUpDto;
        const salt = 10;
        const hashPassword = await bcrypt.hash(password, salt);

        const existedUser = await this.userModel.findOne({ email });
        // if (existedUser) {
        //     throw new ExistedEmailError('User already exists');
        // }

        const user = new this.userModel({ email, password: hashPassword });

        return user.save();
    }
}
