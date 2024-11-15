import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { IdDto } from '../common/dto/id.dto';

@Controller('owners')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post()
  async create(@Body() idDto: IdDto) {
    return await this.ownerService.create(idDto);
  }

  @Get()
  async findAll() {
    return await this.ownerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.ownerService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.ownerService.remove(id);
  }
}
