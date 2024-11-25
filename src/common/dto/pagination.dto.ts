import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, Min } from "class-validator";

export class PaginationDto {

    @ApiProperty({example: 2, description: 'page'})
    @IsOptional()
    @IsInt()
    @Min(1)
    page: number
    
    @ApiProperty({example: 15, description: 'limit of users list for page'})
    @IsInt()
    @Min(1)
    @IsOptional()
    limit: number
}