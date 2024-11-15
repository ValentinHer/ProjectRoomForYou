import { User } from "../../user/entities/user.entity";
export declare class Role {
    id: string;
    name: string;
    users: User[];
    createdAt: Date;
}
