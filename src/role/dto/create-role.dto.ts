import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
    @ApiProperty({example: 'cliente', description: 'New role for users'})
    @IsString()
    @IsNotEmpty()
    name: string;
}
