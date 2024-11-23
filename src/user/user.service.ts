import { HttpException, HttpStatus, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from '../role/entities/role.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(@InjectRepository(User) private userRepository: Repository<User>,
              @InjectRepository(Role) private roleRepository: Repository<Role>){}

  async onModuleInit() {
    const adminUser = {
      "firstname": "RoomForYouAdmin",
      "lastname": "admin",
      "email": "mxvalen13@gmail.com",
      "password": "RoomForYouAdmin",
      "numberPhone": "7711823621",
      "gender": "masculino"
    }

    const userAdmin = await this.userRepository.findOne({
      where: {
        email: adminUser.email
      }
    });

    if(userAdmin) return;

    adminUser.password = await this.hashPassword(adminUser.password);

    const roleFound = await this.roleRepository.findOne({
      where: {
        name: "admin"
      }
    })

    if(!roleFound) return;

    await this.userRepository.save({role: roleFound, ...adminUser});
  }

  async create(user: CreateUserDto) {
    const {role, password, ...otherData} = user;

    const roleFound = await this.roleRepository.findOne({
      where: {name: role}
    })

    if(!roleFound) throw new NotFoundException('Role not Found');

    const passwordHash = await this.hashPassword(user.password)

    const newUser = {...otherData, role: roleFound, password: passwordHash}
    
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
      throw new HttpException(`User with id ${id} deleted`, HttpStatus.OK);
    } catch (e) {
      throw new HttpException(`error: ${e}`, HttpStatus.CONFLICT)
    }
  }

  private async hashPassword(password: string, salts: number = 10){
    return await bcrypt.hash(password, salts);
  }
}
