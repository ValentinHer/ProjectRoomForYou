import { AppointmentAvailableService } from './appointment-available.service';
import { CreateAppointmentAvailableDto } from './dto/create-appointment-available.dto';
import { UpdateAppointmentAvailableDto } from './dto/update-appointment-available.dto';
export declare class AppointmentAvailableController {
    private readonly appointmentAvailableService;
    constructor(appointmentAvailableService: AppointmentAvailableService);
    create(createAppointmentAvailableDto: CreateAppointmentAvailableDto): Promise<{
        day: import("./dto/create-appointment-available.dto").WeekDays;
        hourStart: string;
        hourEnd: string;
        owner: import("../owner/entities/owner.entity").Owner;
    } & import("./entities/appointment-available.entity").AppointmentAvailable>;
    findAll(): Promise<import("./entities/appointment-available.entity").AppointmentAvailable[]>;
    findOne(id: string): Promise<import("./entities/appointment-available.entity").AppointmentAvailable>;
    update(id: string, updateAppointmentAvailableDto: UpdateAppointmentAvailableDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
