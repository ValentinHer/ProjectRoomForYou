import { Appointment } from "../../appointment/entities/appointment.entity";
import { Owner } from "../../owner/entities/owner.entity";
export declare class Property {
    id: string;
    title: string;
    type: string;
    address: string;
    transactionType: string;
    price: number;
    description: string;
    features: string;
    state: string;
    owner: Owner;
    appointments: Appointment[];
    createdAt: Date;
    updatedAt: Date;
}
