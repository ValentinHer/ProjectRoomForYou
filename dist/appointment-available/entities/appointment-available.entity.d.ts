import { Owner } from "../../owner/entities/owner.entity";
export declare class AppointmentAvailable {
    id: string;
    day: string;
    hourStart: string;
    hourEnd: string;
    owner: Owner;
    createdAt: Date;
    updatedAt: Date;
}
