import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  @Roles(['propietario', 'admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() createPropertyDto: CreatePropertyDto) {
    return await this.propertyService.create(createPropertyDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.propertyService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.propertyService.findOne(id);
  }

  @Patch(':id')
  @Roles(['propietario', 'admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
    return await this.propertyService.update(id, updatePropertyDto);
  }

  @Delete(':id')
  @Roles(['propietario', 'admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async remove(@Param('id') id: string) {
    return await this.propertyService.remove(id);
  }
}
