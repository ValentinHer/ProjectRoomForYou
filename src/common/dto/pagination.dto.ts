import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {

    @ApiProperty({example: 2, description: 'page'})
    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    @IsInt()
    page?: number = 1;
    
    @ApiProperty({example: 15, description: 'limit of users list for page'})
    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    @IsInt()
    limit?: number = 10;
}