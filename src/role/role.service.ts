import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm'; 

@Injectable()
export class RoleService implements OnModuleInit {
  constructor(@InjectRepository(Role) private roleRepository: Repository<Role>){}

  async onModuleInit() {
    const count = await this.roleRepository.count();
    if(count > 0) return;

    const roles = ["admin", "propietario", "cliente"];

    for (let i = 0; i < roles.length; i++) {
      await this.create({name: roles[i]});
    }
  }

  async create(createRoleDto: CreateRoleDto) {
    const roleFound = await this.roleRepository.findOne({
      where: {
        name: createRoleDto.name
      }
    })

    if(roleFound) throw new ConflictException("Role already exist");

    return await this.roleRepository.save(createRoleDto);
  }

  async findAll() {
    return await this.roleRepository.find();
  }

  async findOne(id: string) {
    const roleFound =  await this.roleRepository.findOne({
      where: {id}
    });

    if(!roleFound) throw new NotFoundException("Role Not Found");

    return roleFound;
  }
}
