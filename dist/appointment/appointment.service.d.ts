import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { ClientService } from '../client/client.service';
import { PropertyService } from '../property/property.service';
export declare class AppointmentService {
    private appointmentRepository;
    private clientService;
    private propertyService;
    constructor(appointmentRepository: Repository<Appointment>, clientService: ClientService, propertyService: PropertyService);
    create(createAppointmentDto: CreateAppointmentDto): Promise<{
        dateStart: string;
        dateEnd: string;
        client: import("../client/entities/client.entity").Client;
        property: import("../property/entities/property.entity").Property;
    } & Appointment>;
    findAll(): Promise<Appointment[]>;
    findOne(id: string): Promise<Appointment>;
    update(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<void>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
