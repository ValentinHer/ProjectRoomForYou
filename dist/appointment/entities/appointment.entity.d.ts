import { Client } from "../../client/entities/client.entity";
import { Property } from "../../property/entities/property.entity";
export declare class Appointment {
    id: string;
    dateStart: string;
    dateEnd: string;
    client: Client;
    property: Property;
    createdAt: Date;
    updatedAt: Date;
}
