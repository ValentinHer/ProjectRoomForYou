import { ApiProperty } from '@nestjs/swagger';
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

    @ApiProperty({example: 'Emilio', description: 'User firstname'})
    @IsString()
    @IsNotEmpty()
    firstname: string;

    @ApiProperty({example: 'Castillo Lopez', description: 'User lastname'})
    @IsString()
    @IsNotEmpty()
    lastname: string;

    @ApiProperty({example: 'userfirstname122@gmail.com', description: 'User email'})
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({example: 'userfisrtname_2123', description: 'User password'})
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({example: '7712324312', description: 'User numberPhone'})
    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber('MX')
    numberPhone: string

    @ApiProperty({enum: UserGender, description: 'User gender'})
    @IsString()
    @IsNotEmpty()
    @IsEnum(UserGender)
    gender: string;

    @ApiProperty({enum: UserRole, description: 'User role'})
    @IsString()
    @IsNotEmpty()
    @IsEnum(UserRole)
    role: string;
}
