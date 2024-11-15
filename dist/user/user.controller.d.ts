import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<import("@nestjs/common").HttpException | ({
        role: import("../role/entities/role.entity").Role;
        password: string;
        firstname: string;
        lastname: string;
        email: string;
        phoneNumber: string;
    } & import("./entities/user.entity").User)>;
    findAll(query: PaginationDto): Promise<{
        data: import("./entities/user.entity").User[];
        total: number;
        page: number;
        lastPage: number;
    }>;
    findOne(id: string): Promise<import("./entities/user.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
