import { IsNotEmpty, IsString } from "class-validator";

export class CreateAppointmentDto {
    
    @IsString()
    @IsNotEmpty()
    dateStart: string;
    
    @IsString()
    @IsNotEmpty()
    dateEnd: string;

    @IsString()
    @IsNotEmpty()
    clientId: string;

    @IsString()
    @IsNotEmpty()
    propertyId: string;
}
