import { Property } from "../../property/entities/property.entity";
import { AppointmentAvailable } from "../../appointment-available/entities/appointment-available.entity";
import { User } from "../../user/entities/user.entity";
export declare class Owner {
    id: string;
    user: User;
    properties: Property[];
    appointmentAvailables: AppointmentAvailable[];
    createdAt: Date;
}
