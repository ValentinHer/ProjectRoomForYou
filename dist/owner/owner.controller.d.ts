import { OwnerService } from './owner.service';
import { IdDto } from '../common/dto/id.dto';
export declare class OwnerController {
    private readonly ownerService;
    constructor(ownerService: OwnerService);
    create(idDto: IdDto): Promise<{
        user: import("../user/entities/user.entity").User;
    } & import("./entities/owner.entity").Owner>;
    findAll(): Promise<import("./entities/owner.entity").Owner[]>;
    findOne(id: string): Promise<import("./entities/owner.entity").Owner>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
