import { HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from '../role/entities/role.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
export declare class UserService {
    private userRepository;
    private roleRepository;
    constructor(userRepository: Repository<User>, roleRepository: Repository<Role>);
    create(user: CreateUserDto): Promise<HttpException | ({
        role: Role;
        password: string;
        firstname: string;
        lastname: string;
        email: string;
        phoneNumber: string;
    } & User)>;
    findAll(query: PaginationDto): Promise<{
        data: User[];
        total: number;
        page: number;
        lastPage: number;
    }>;
    findOne(id: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<{
        message: string;
    }>;
    private hashPassword;
}
