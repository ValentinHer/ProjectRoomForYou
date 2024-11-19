import { Role } from "../../role/entities/role.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    numberPhone: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    gender: string;

    @ManyToOne(() => Role, role => role.users)
    role: Role;

    @CreateDateColumn({name: "created_at"})
    createdAt: Date;

    @UpdateDateColumn({name: "updated_at"})
    updatedAt: Date
}
