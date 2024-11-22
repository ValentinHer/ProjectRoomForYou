import { CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Appointment } from "../../appointment/entities/appointment.entity";

@Entity()
export class Client {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @OneToMany(() => Appointment, appointment => appointment.client)
    appointments: Appointment[];

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
}
