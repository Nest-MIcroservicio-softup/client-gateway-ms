import { IsString, IsNotEmpty, IsEmail, IsStrongPassword } from "class-validator";

export class LoginUserDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsStrongPassword()
    password: string;
}