import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { ClientService } from '../client/client.service';
import { PropertyService } from '../property/property.service';

@Injectable()
export class AppointmentService {
  constructor(@InjectRepository(Appointment) private appointmentRepository: Repository<Appointment>,
              private clientService: ClientService,
              private propertyService: PropertyService){}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const {clientId, propertyId, ...otherData} = createAppointmentDto;

    const clientFound = await this.clientService.findOne(clientId);
    const propertyFound = await this.propertyService.findOne(propertyId);

    return await this.appointmentRepository.save({client: clientFound, property: propertyFound, ...otherData});
  }

  async findAll() {
    return await this.appointmentRepository.find();
  }

  async findOne(id: string) {
    const appointmentFound = await this.appointmentRepository.findOne({
      where: {id}
    })

    if(!appointmentFound) throw new NotFoundException("Appointment Not Found");

    return appointmentFound;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const appointmentFound = await this.findOne(id);
    const {clientId, propertyId, ...otherData} = updateAppointmentDto;
    
    await this.appointmentRepository.update(id, otherData);
  }

  async remove(id: string) {
    const appointmentFound = await this.findOne(id);

    try {      
      const appointmentDeleted = await this.appointmentRepository.delete(id);
      return {message: `Appointment with id: ${id} deleted`}
    } catch (error) {
      return {message: `error to delete the appointment: ${error}`}
    }
  }
}
