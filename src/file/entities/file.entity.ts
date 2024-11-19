import { Property } from "../../property/entities/property.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class File {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string;

    @ManyToOne(() => Property, property => property.files)
    property: Property;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
}