import { User } from "../../user/entities/user.entity";
import { Appointment } from "../../appointment/entities/appointment.entity";
export declare class Client {
    id: string;
    user: User;
    appointments: Appointment[];
    createdAt: Date;
}
