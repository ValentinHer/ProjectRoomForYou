import { IdDto } from '../common/dto/id.dto';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
export declare class ClientService {
    private clientRepository;
    private userService;
    constructor(clientRepository: Repository<Client>, userService: UserService);
    create(idDto: IdDto): Promise<{
        user: import("../user/entities/user.entity").User;
    } & Client>;
    findAll(): Promise<Client[]>;
    findOne(id: string): Promise<Client>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
