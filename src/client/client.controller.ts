import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { IdDto } from '../common/dto/id.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @ApiOperation({summary: 'Create client by userId'})
  @ApiBody({description: 'Data to send in request body', type: IdDto})
  @ApiResponse({status: 200, description: 'Return client created'})
  @ApiResponse({status: 404, description: 'Not Found'})
  async create(@Body() idDto: IdDto) {
    return await this.clientService.create(idDto);
  }

  @Get()
  @ApiOperation({summary: 'Get all clients [Only access for users logged who have role admin]'})
  @ApiResponse({status: 200, description: 'Return array clients/array empty'})
  @Roles(['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll() {
    return await this.clientService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get a client [Only access for users logged who have role admin]'})
  @ApiParam({name: 'id', type: 'Client id', example: '60e92b59-6a6d-4f8b-baca-c9fde9d1313a'})
  @ApiResponse({status: 200, description: 'Return client found'})
  @ApiResponse({status: 404, description: 'Not Found'})
  @Roles(['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOne(@Param('id') id: string) {
    return await this.clientService.findOne(id);
  }

  @Get('by-user/:id')
  @ApiOperation({summary: 'Get a client by userId [Only access for users logged who have role admin/cliente]'})
  @ApiParam({name: 'id', type: 'User id', example: '60e92b59-6a6d-4f8b-baca-c9fde9d1313a'})
  @ApiResponse({status: 200, description: 'Return client found'})
  @ApiResponse({status: 404, description: 'Not Found'})
  @Roles(['cliente', 'admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOneByUserId(@Param('id') id: string) {
    return await this.clientService.findOneByUserId(id);
  }

  @Delete(':id')
  @ApiOperation({summary: 'delete a client [Only access for users logged with role admin/cliente]'})
  @ApiParam({name: 'id', type: 'Client id', example: '60e92b59-6a6d-4f8b-baca-c9fde9d1313a'})
  @ApiResponse({status: 200, description: 'Return a message'})
  @ApiResponse({status: 409, description: 'Conflict'})
  @Roles(['cliente', 'admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async remove(@Param('id') id: string) {
    return await this.clientService.remove(id);
  }
}
