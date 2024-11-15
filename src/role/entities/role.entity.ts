import { User } from "../../user/entities/user.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToMany(() => User, user => user.role)
    users: User[];

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date
}
