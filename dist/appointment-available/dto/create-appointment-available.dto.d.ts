export declare enum WeekDays {
    LUNES = "LUNES",
    MARTES = "MARTES",
    MIERCOLES = "MIERCOLES",
    JUEVES = "JUEVES",
    VIERNES = "VIERNES",
    SABADO = "SABADO",
    DOMINGO = "DOMINGO"
}
export declare class CreateAppointmentAvailableDto {
    ownerId: string;
    day: WeekDays;
    hourStart: string;
    hourEnd: string;
}
