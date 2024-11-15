import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
export declare class AppointmentController {
    private readonly appointmentService;
    constructor(appointmentService: AppointmentService);
    create(createAppointmentDto: CreateAppointmentDto): Promise<{
        dateStart: string;
        dateEnd: string;
        client: import("../client/entities/client.entity").Client;
        property: import("../property/entities/property.entity").Property;
    } & import("./entities/appointment.entity").Appointment>;
    findAll(): Promise<import("./entities/appointment.entity").Appointment[]>;
    findOne(id: string): Promise<import("./entities/appointment.entity").Appointment>;
    update(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<void>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
