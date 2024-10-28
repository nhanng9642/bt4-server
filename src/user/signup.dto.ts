import { IsEmail, IsNotEmpty } from "class-validator";

export default class SignUpDto {
    @IsEmail({}, {message: "Please enter a valid email address"})
    email: string;

    @IsNotEmpty({message: "Please enter a password"})
    password: string;

    @IsNotEmpty({message: "Please enter a confirm password"})
    confirmPassword: String;
}