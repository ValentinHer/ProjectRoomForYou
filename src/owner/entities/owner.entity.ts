import { CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "../../property/entities/property.entity";
import { AppointmentAvailable } from "../../appointment-available/entities/appointment-available.entity";
import { User } from "../../user/entities/user.entity";

@Entity()
export class Owner {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User)
    user: User

    @OneToMany(() => Property, property => property.owner)
    properties: Property[];

    @OneToMany(() => AppointmentAvailable, appointmemtAvailable => appointmemtAvailable.owner)
    appointmentAvailables: AppointmentAvailable[];

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
}