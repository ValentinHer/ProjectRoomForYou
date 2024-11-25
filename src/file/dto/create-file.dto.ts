import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateFileDto {

    @ApiProperty({example: '60e92b59-6a6d-4f8b-baca-c9fde9d1313a', description: 'Property Id'})
    @IsString()
    @IsNotEmpty()
    propertyid: string;
}
