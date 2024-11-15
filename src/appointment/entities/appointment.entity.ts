import { Client } from "../../client/entities/client.entity";
import { Property } from "../../property/entities/property.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Appointment {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column('timestamp', {name: 'date_start'})
    dateStart: string;

    @Column('timestamp', {name: 'date_end'})
    dateEnd: string;

    @ManyToOne(() => Client, client => client.appointments)
    client: Client;

    @ManyToOne(() => Property, property => property.appointments)
    property: Property;

    @CreateDateColumn({name: "created_at"})
    createdAt: Date;

    @UpdateDateColumn({name: "updated_at"})
    updatedAt: Date
}
