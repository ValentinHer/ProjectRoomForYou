import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { Repository } from 'typeorm';
import { IdDto } from '../common/dto/id.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class OwnerService {
  constructor(@InjectRepository(Owner) private ownerRepository: Repository<Owner>, private userService: UserService){}

  async create(idDto: IdDto) {
    const user = await this.userService.findOne(idDto.id);

    return await this.ownerRepository.save({user});
  }

  async findAll() {
    return await this.ownerRepository.find({
      relations: {user: true}
    });
  }

  async findOne(id: string) {
    const ownerFound =  await this.ownerRepository.findOne({
      where: {id},
      relations: {user: true}
    });

    if(!ownerFound) throw new NotFoundException("Owner Not Found");

    return ownerFound;
  }

  async remove(id: string) {
    const ownerFound = await this.findOne(id);

    const ownerDeleted = await this.ownerRepository.delete(id);

    return {message: `Owner with id: ${id} deleted`};
  }
}
