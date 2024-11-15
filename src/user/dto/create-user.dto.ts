import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    firstname: string;

    @IsString()
    lastname: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsPhoneNumber('MX')
    phoneNumber: string

    @IsString()
    role: string;
}
