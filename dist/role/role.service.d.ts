import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
export declare class RoleService {
    private roleRepository;
    constructor(roleRepository: Repository<Role>);
    create(createRoleDto: CreateRoleDto): Promise<CreateRoleDto & Role>;
    findAll(): Promise<Role[]>;
    findOne(id: string): Promise<Role>;
}
