import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { Repository } from 'typeorm';
import { OwnerService } from '../owner/owner.service';

@Injectable()
export class PropertyService {
  constructor(@InjectRepository(Property) private propertyRepository: Repository<Property>, private ownerService: OwnerService){}

  async create(createPropertyDto: CreatePropertyDto) {
    const{ownerId, ...otherData} = createPropertyDto;

    const owner = await this.ownerService.findOne(ownerId);

    const propertyFound = await this.propertyRepository.findOne({
      where: {title: createPropertyDto.title}
    })

    if(propertyFound) throw new ConflictException(`Property with title ${createPropertyDto.title} already exist`);

    return await this.propertyRepository.save(otherData);
  }

  async findAll() {
    return await this.propertyRepository.find();
  }

  async findOne(id: string): Promise<Property> {
    const propertyFound = await this.propertyRepository.findOne({
      where: {id}
    })

    if(!propertyFound) throw new NotFoundException("Property Not Found");

    return propertyFound;
  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto) {
    const propertyFound = await this.findOne(id);

    const {ownerId, ...otherData} = updatePropertyDto;
    
    return await this.propertyRepository.update(id, otherData);
  }

  async remove(id: string) {
    const propertyFound = await this.findOne(id);

    try {
      const propertyDeleted = await this.propertyRepository.delete(id);
      throw new HttpException(`Property with ${id} deleted`, HttpStatus.OK)
    } catch (error) {
      throw new ConflictException(`error: ${error}`);
    }
  }
}
