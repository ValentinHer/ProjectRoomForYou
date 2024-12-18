import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IdDto } from '../common/dto/id.dto';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class ClientService {
  constructor(@InjectRepository(Client) private clientRepository: Repository<Client>, private userService: UserService){}

  async create(idDto: IdDto) {
    const userFound = await this.userService.findOne(idDto.userId);  

    return await this.clientRepository.save({user: userFound});
  }

  async findAll() {
    return await this.clientRepository.find({
      relations: {user: true}
    });
  }

  async findOne(id: string) {
    const clientFound = await this.clientRepository.findOne({
      where: {id},
      relations: {user: true}
    });

    if(!clientFound) throw new NotFoundException("Client Not Found");

    return clientFound;
  }

  async findOneByUserId(id: string) {
    const clientFound = await this.clientRepository.findOne({
      where: {user: {id}},
      relations: {user: true}
    });

    if(!clientFound) throw new NotFoundException("Client Not Found");

    return clientFound;
  }

  async remove(id: string) {
    const clientFound = await this.findOne(id);

    try {
      const clientDeleted = await this.clientRepository.delete(id);
      throw new HttpException(`Client with id: ${id} deleted`, HttpStatus.OK);      
    } catch (error) {
      throw new HttpException(`error: ${error}`, HttpStatus.CONFLICT);
    }
  }
}
