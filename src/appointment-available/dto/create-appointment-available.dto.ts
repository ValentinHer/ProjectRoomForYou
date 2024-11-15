import { IsNotEmpty, IsString } from "class-validator";

export enum WeekDays {
    LUNES =  "LUNES",
    MARTES = "MARTES",
    MIERCOLES = "MIERCOLES",
    JUEVES = "JUEVES",
    VIERNES = "VIERNES",
    SABADO = "SABADO",
    DOMINGO = "DOMINGO"
}

export class CreateAppointmentAvailableDto {
    
    @IsString()
    @IsNotEmpty()
    ownerId: string;

    @IsString()
    @IsNotEmpty()
    day: WeekDays;

    @IsString()
    @IsNotEmpty()
    hourStart: string;

    @IsString()
    @IsNotEmpty()
    hourEnd: string;
}
