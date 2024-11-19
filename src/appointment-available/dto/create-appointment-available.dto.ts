import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export enum WeekDays {
    lunes =  "lunes",
    martes = "martes",
    miercoles = "miercoles",
    jueves = "jueves",
    viernes = "viernes",
    sabado = "sabado",
    domingo = "domingo"
}

export class CreateAppointmentAvailableDto {
    
    @IsString()
    @IsNotEmpty()
    ownerId: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(WeekDays)
    day: string;

    @IsString()
    @IsNotEmpty()
    hourStart: string;

    @IsString()
    @IsNotEmpty()
    hourEnd: string;
}
