import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientService } from './client.service';
import { IdDto } from '../common/dto/id.dto';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() idDto: IdDto) {
    return await this.clientService.create(idDto);
  }

  @Get()
  async findAll() {
    return await this.clientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.clientService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.clientService.remove(id);
  }
}
