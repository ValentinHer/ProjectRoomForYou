import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from '../role/entities/role.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>,
              @InjectRepository(Role) private roleRepository: Repository<Role>){}

  async create(user: CreateUserDto) {
    const {role, password, ...otherData} = user;

    const roleFind = await this.roleRepository.findOne({
      where: {name: role}
    })

    if(!roleFind) return new HttpException('Role not Found', HttpStatus.NOT_FOUND);

    const passwordHash = await this.hashPassword(password)

    const newUser = {...otherData, role: roleFind, password: passwordHash}
    
    return await this.userRepository.save(newUser);
  }

  async findAll(query: PaginationDto) {
    const limit = query.limit?? 10;
    const page = query.page?? 1;
    const skipData = (page - 1) * limit;

    const [users, total] = await this.userRepository.findAndCount({
      skip: skipData,
      take: limit,
      relations: {role: true}
    });

    const lastPage = Math.ceil(total / limit) == 0 ? 1 : Math.ceil(total / limit); 
    
    if(page > lastPage) throw new HttpException('Page Not Found', HttpStatus.NOT_FOUND);

    return {data: users, total, page, lastPage}
  }

  async findOne(id: string) {
    const userFound = await this.userRepository.findOne({
      where: {
        id
      }
    });

    if(!userFound) throw new NotFoundException("User Not Found");

    return userFound;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userFound = await this.findOne(id);

    const {role, password, ...otherData} = updateUserDto;

    if(role) throw new HttpException("Role can't be changed", HttpStatus.CONFLICT);

    let newPassword: string;

    if(password){
      newPassword = await this.hashPassword(password);
    }

    const userUpdate = { password: newPassword, ...otherData}

    return this.userRepository.update(userFound.id, userUpdate);
  }

  async remove(id: string) {
    const userFound = await this.findOne(id);

    try {
      const userDeleted = await this.userRepository.delete(id);
      return {message: `User with id: ${id} deleted`}
    } catch (e) {
      throw new HttpException(`You must first delete the table relationed ${e}`, HttpStatus.NOT_ACCEPTABLE)
    }
  }

  private async hashPassword(password: string, salts: number = 10){
    return await bcrypt.hash(password, salts);
  }
}
