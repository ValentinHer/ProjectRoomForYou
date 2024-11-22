import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AppointmentAvailableService } from './appointment-available.service';
import { CreateAppointmentAvailableDto } from './dto/create-appointment-available.dto';
import { UpdateAppointmentAvailableDto } from './dto/update-appointment-available.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('appointment-availables')
export class AppointmentAvailableController {
  constructor(private readonly appointmentAvailableService: AppointmentAvailableService) {}

  @Post()
  @Roles(['admin, propietario'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() createAppointmentAvailableDto: CreateAppointmentAvailableDto) {
    return await this.appointmentAvailableService.create(createAppointmentAvailableDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.appointmentAvailableService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.appointmentAvailableService.findOne(id);
  }

  @Patch(':id')
  @Roles(['admin, propietario'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(@Param('id') id: string, @Body() updateAppointmentAvailableDto: UpdateAppointmentAvailableDto) {
    return await this.appointmentAvailableService.update(id, updateAppointmentAvailableDto);
  }

  @Delete(':id')
  @Roles(['admin, propietario'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async remove(@Param('id') id: string) {
    return await this.appointmentAvailableService.remove(id);
  }
}
