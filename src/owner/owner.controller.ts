import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { IdDto } from '../common/dto/id.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('owners')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post()
  async create(@Body() idDto: IdDto) {
    return await this.ownerService.create(idDto);
  }

  @Get()
  @Roles(['admin', 'propietario'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll() {
    return await this.ownerService.findAll();
  }

  @Get(':id')
  @Roles(['admin', 'propietario'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOne(@Param('id') id: string) {
    return await this.ownerService.findOne(id);
  }

  @Delete(':id')
  @Roles(['admin', 'propietario'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async remove(@Param('id') id: string) {
    return await this.ownerService.remove(id);
  }
}
