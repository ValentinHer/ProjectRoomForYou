import { Owner } from "../../owner/entities/owner.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class AppointmentAvailable {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    day: string;

    @Column('time', {name: 'hour_start'})
    hourStart: string;  

    @Column('time', {name: 'hour_end'})
    hourEnd: string;

    @ManyToOne(() => Owner, owner => owner.appointmentAvailables)
    owner: Owner;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;
}
