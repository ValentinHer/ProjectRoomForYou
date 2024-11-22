import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @Roles(['cliente', 'admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return await this.appointmentService.create(createAppointmentDto);
  }

  @Get()
  @Roles(['cliente', 'admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll() {
    return await this.appointmentService.findAll();
  }

  @Get(':id')
  @Roles(['cliente', 'admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOne(@Param('id') id: string) {
    return await this.appointmentService.findOne(id);
  }

  @Patch(':id')
  @Roles(['cliente', 'admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return await this.appointmentService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  @Roles(['cliente', 'admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async remove(@Param('id') id: string) {
    return await this.appointmentService.remove(id);
  }
}
