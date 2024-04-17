import { IsString, IsEmail, IsStrongPassword, Min } from "class-validator";

export class CreateAuthDto {

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsStrongPassword()
    password: string;

    @IsString()
    nombre: string;

    

}
