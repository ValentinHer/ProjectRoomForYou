import { CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Appointment } from "../../appointment/entities/appointment.entity";

@Entity()
export class Client {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User)
    user: User;

    @OneToMany(() => Appointment, appointment => appointment.client)
    appointments: Appointment[];

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
}
