import { Owner } from './entities/owner.entity';
import { Repository } from 'typeorm';
import { IdDto } from '../common/dto/id.dto';
import { UserService } from '../user/user.service';
export declare class OwnerService {
    private ownerRepository;
    private userService;
    constructor(ownerRepository: Repository<Owner>, userService: UserService);
    create(idDto: IdDto): Promise<{
        user: import("../user/entities/user.entity").User;
    } & Owner>;
    findAll(): Promise<Owner[]>;
    findOne(id: string): Promise<Owner>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
