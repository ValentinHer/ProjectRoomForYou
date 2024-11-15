import { Role } from "../../role/entities/role.entity";
export declare class User {
    id: string;
    firstname: string;
    lastname: string;
    numberPhone: string;
    email: string;
    password: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}
