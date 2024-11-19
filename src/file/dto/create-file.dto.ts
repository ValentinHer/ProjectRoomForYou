import { IsNotEmpty, IsString } from "class-validator";

export class CreateFileDto {
    @IsString()
    @IsNotEmpty()
    propertyid: string;
}
