import { ConflictException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAppointmentAvailableDto } from './dto/create-appointment-available.dto';
import { UpdateAppointmentAvailableDto } from './dto/update-appointment-available.dto';
import { AppointmentAvailable } from './entities/appointment-available.entity';
import { Repository } from 'typeorm';
import { OwnerService } from '../owner/owner.service';

@Injectable()
export class AppointmentAvailableService {
  constructor(@InjectRepository(AppointmentAvailable) private appointmentAvailableRepository: Repository<AppointmentAvailable>,
              private ownerService: OwnerService){}

  async create(createAppointmentAvailableDto: CreateAppointmentAvailableDto) {
    const {ownerId, ...otherData} = createAppointmentAvailableDto;

    const ownerFound = await this.ownerService.findOne(ownerId);
    const day = otherData.day.toUpperCase();

    const dayFound = await this.appointmentAvailableRepository.findOne({
      where:{
        owner: {id: ownerId},
        day
      }
    })

    if(dayFound) throw new ConflictException("The day already exist");

    return await this.appointmentAvailableRepository.save({owner: ownerFound, ...otherData});
  }

  async findAll() {
    return await this.appointmentAvailableRepository.find();
  }

  async findOne(id: string) {
    const appointmentAvailableFound = await this.appointmentAvailableRepository.findOne({
      where: {id}
    })

    if(!appointmentAvailableFound) throw new NotFoundException("Appointment Available Not Found");

    return appointmentAvailableFound;
  }

  async update(id: string, updateAppointmentAvailableDto: UpdateAppointmentAvailableDto) {
    const {ownerId, day, ...otherData} = updateAppointmentAvailableDto;

    const appointmentAvailableFound = await this.findOne(id);
    if(day) throw new NotAcceptableException("You can't change the day of Appointment Available");

    return await this.appointmentAvailableRepository.update(id, otherData);
  }

  async remove(id: string) {
    const appointmentAvailableFound = await this.findOne(id);

    const appointmentAvailableDeleted = await this.appointmentAvailableRepository.delete(id);

    return {message: `appointment Available with id: ${id} deleted`};
  }
}
