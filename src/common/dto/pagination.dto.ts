import { IsInt, IsOptional, Min } from "class-validator";

export class PaginationDto {
    @IsOptional()
    @IsInt()
    @Min(1)
    page: number
    
    @IsInt()
    @Min(1)
    @IsOptional()
    limit: number
}