import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignupDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;

    @IsNotEmpty()
    @IsString()
    readonly firstName: string;
    
    @IsNotEmpty()
    @IsString()
    readonly lastName: string;
}
