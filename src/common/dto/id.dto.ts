import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class IdDto {

    @ApiProperty({example: '60e92b59-6a6d-4f8b-baca-c9fde9d1313a', description: 'User id to create a owner'})
    @IsString()
    @IsNotEmpty()
    userId: string;
}