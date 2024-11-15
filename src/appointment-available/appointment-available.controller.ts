import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppointmentAvailableService } from './appointment-available.service';
import { CreateAppointmentAvailableDto } from './dto/create-appointment-available.dto';
import { UpdateAppointmentAvailableDto } from './dto/update-appointment-available.dto';

@Controller('appointment-availables')
export class AppointmentAvailableController {
  constructor(private readonly appointmentAvailableService: AppointmentAvailableService) {}

  @Post()
  async create(@Body() createAppointmentAvailableDto: CreateAppointmentAvailableDto) {
    return await this.appointmentAvailableService.create(createAppointmentAvailableDto);
  }

  @Get()
  async findAll() {
    return await this.appointmentAvailableService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.appointmentAvailableService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAppointmentAvailableDto: UpdateAppointmentAvailableDto) {
    return await this.appointmentAvailableService.update(id, updateAppointmentAvailableDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.appointmentAvailableService.remove(id);
  }
}
