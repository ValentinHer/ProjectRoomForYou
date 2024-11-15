import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    create(createRoleDto: CreateRoleDto): Promise<CreateRoleDto & import("./entities/role.entity").Role>;
    findAll(): Promise<import("./entities/role.entity").Role[]>;
    findOne(id: string): Promise<import("./entities/role.entity").Role>;
}
