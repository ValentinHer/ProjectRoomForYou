import { ClientService } from './client.service';
import { IdDto } from '../common/dto/id.dto';
export declare class ClientController {
    private readonly clientService;
    constructor(clientService: ClientService);
    create(idDto: IdDto): Promise<{
        user: import("../user/entities/user.entity").User;
    } & import("./entities/client.entity").Client>;
    findAll(): Promise<import("./entities/client.entity").Client[]>;
    findOne(id: string): Promise<import("./entities/client.entity").Client>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
