import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export enum UserRole {
    cliente = "cliente",
    admin = "admin",
    propietario = "propietario"
}

export enum UserGender {
    masculino = "masculino",
    femenino = "femenino"
}

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    firstname: string;

    @IsString()
    @IsNotEmpty()
    lastname: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber('MX')
    numberPhone: string

    @IsString()
    @IsNotEmpty()
    @IsEnum(UserGender)
    gender: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(UserRole)
    role: string;
}
