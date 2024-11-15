import { CreateAppointmentAvailableDto } from './dto/create-appointment-available.dto';
import { UpdateAppointmentAvailableDto } from './dto/update-appointment-available.dto';
import { AppointmentAvailable } from './entities/appointment-available.entity';
import { Repository } from 'typeorm';
import { OwnerService } from '../owner/owner.service';
export declare class AppointmentAvailableService {
    private appointmentAvailableRepository;
    private ownerService;
    constructor(appointmentAvailableRepository: Repository<AppointmentAvailable>, ownerService: OwnerService);
    create(createAppointmentAvailableDto: CreateAppointmentAvailableDto): Promise<{
        day: import("./dto/create-appointment-available.dto").WeekDays;
        hourStart: string;
        hourEnd: string;
        owner: import("../owner/entities/owner.entity").Owner;
    } & AppointmentAvailable>;
    findAll(): Promise<AppointmentAvailable[]>;
    findOne(id: string): Promise<AppointmentAvailable>;
    update(id: string, updateAppointmentAvailableDto: UpdateAppointmentAvailableDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
