import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiOperation, ApiBody, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { PaginationDto } from '../common/dto/pagination.dto';

@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  @ApiOperation({summary: `Create Owner's property [Only access for users logged who have role admin/propietario]`})
  @ApiBody({type: CreatePropertyDto, description: 'Data to send in request body'})
  @ApiResponse({status: 200, description: 'Return property created'})
  @ApiResponse({status: 409, description: 'Conflict'})
  @Roles(['propietario', 'admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() createPropertyDto: CreatePropertyDto) {
    return await this.propertyService.create(createPropertyDto);
  }

  @Get()
  @ApiOperation({summary: `Get properties [Only access for users logged]`})
  @ApiQuery({name: 'PaginationDto', type: PaginationDto})
  @ApiResponse({status: 200, description: 'Return array propierties/array empty'})
  @UseGuards(JwtAuthGuard)
  async findAll(@Query() query: PaginationDto) {
    return await this.propertyService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({summary: `Get a Owner property [Only access for users logged who have role admin/propietario]`})
  @ApiParam({name: 'id', example: '60e92b59-6a6d-4f8b-baca-c9fde9d1313a', description: 'Property id'})
  @ApiResponse({status: 200, description: 'Return property found'})
  @ApiResponse({status: 404, description: 'Not Found'})
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.propertyService.findOne(id);
  }

  @Get('by-owner/:id')
  @ApiOperation({summary: `Get properties by owner [Only access for users logged who have role admin/propietario]`})
  @ApiQuery({name: 'PaginationDto', type: PaginationDto})
  @ApiParam({name: 'id', example: '60e92b59-6a6d-4f8b-baca-c9fde9d1313a', description: 'Owner id'})
  @ApiResponse({status: 200, description: 'Return array propierties/array empty'})
  @Roles(['propietario', 'admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAllByOwerId(@Param('id') id: string, @Query() query: PaginationDto) {
    return await this.propertyService.findAllByOwnerId(id, query);
  }

  @Patch(':id')
  @ApiOperation({summary: `Update a Owner property [Only access for users logged who have role admin/propietario]`})
  @ApiParam({name: 'id', example: '60e92b59-6a6d-4f8b-baca-c9fde9d1313a', description: 'Property id'})
  @ApiBody({type: CreatePropertyDto, description: 'Data to send in request body to update property [optional]'})
  @ApiResponse({status: 200, description: 'Return property update'})
  @Roles(['propietario', 'admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
    return await this.propertyService.update(id, updatePropertyDto);
  }

  @Delete(':id')
  @ApiOperation({summary: `Delete a Owner property [Only access for users logged who have role admin/propietario]`})
  @ApiParam({name: 'id', example: '60e92b59-6a6d-4f8b-baca-c9fde9d1313a', description: 'Property id'})
  @ApiResponse({status: 200, description: 'Return message'})
  @ApiResponse({status: 409, description: 'Conflict'})
  @Roles(['propietario', 'admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async remove(@Param('id') id: string) {
    return await this.propertyService.remove(id);
  }
}
