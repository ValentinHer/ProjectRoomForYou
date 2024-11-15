import { Appointment } from "../../appointment/entities/appointment.entity";
import { Owner } from "../../owner/entities/owner.entity";
import { Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany, Entity } from "typeorm";

@Entity()
export class Property {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    type: string;

    @Column()
    address: string;

    @Column()
    transactionType: string;

    @Column("float")
    price: number;

    @Column()
    description: string;

    @Column()
    features: string;

    @Column()
    state: string;

    @ManyToOne(() => Owner, owner => owner.properties)
    owner: Owner;

    @OneToMany(() => Appointment, appointment => appointment.property)
    appointments: Appointment[];

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;
}
