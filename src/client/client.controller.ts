import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { IdDto } from '../common/dto/id.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() idDto: IdDto) {
    return await this.clientService.create(idDto);
  }

  @Get()
  @Roles(['cliente', 'admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll() {
    return await this.clientService.findAll();
  }

  @Get(':id')
  @Roles(['cliente', 'admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOne(@Param('id') id: string) {
    return await this.clientService.findOne(id);
  }

  @Delete(':id')
  @Roles(['cliente', 'admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async remove(@Param('id') id: string) {
    return await this.clientService.remove(id);
  }
}
