import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { IdDto } from '../common/dto/id.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiOperation, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';

@Controller('owners')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post()
  @ApiOperation({summary: 'Create owner by userId'})
  @ApiBody({description: 'Data to send in request body', type: IdDto})
  @ApiResponse({status: 200, description: 'Return owner created'})
  @ApiResponse({status: 404, description: 'Not found'})
  async create(@Body() idDto: IdDto) {
    return await this.ownerService.create(idDto);
  }

  @Get()
  @ApiOperation({summary: 'Get all owners [Only access for users logged who have role admin]'})
  @ApiResponse({status: 200, description: 'Return array owners/array empty'})
  @Roles(['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll() {
    return await this.ownerService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get a owner [Only access for users logged who have role admin]'})
  @ApiParam({name: 'id', type: 'Owner id', example: '60e92b59-6a6d-4f8b-baca-c9fde9d1313a'})
  @ApiResponse({status: 200, description: 'Return owner found'})
  @ApiResponse({status: 404, description: 'Not Found'})
  @Roles(['admin', 'cliente', 'propietario'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOne(@Param('id') id: string) {
    return await this.ownerService.findOne(id);
  }

  @Get('by-user/:id')
  @ApiOperation({summary: 'Get a owner by userId [Only access for users logged who have role admin/propietario]'})
  @ApiParam({name: 'id', type: 'User id', example: '60e92b59-6a6d-4f8b-baca-c9fde9d1313a'})
  @ApiResponse({status: 200, description: 'Return client found'})
  @ApiResponse({status: 404, description: 'Not Found'})
  @Roles(['admin', 'propietario'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOneByUserId(@Param('id') id: string) {
    return await this.ownerService.findOneByUserId(id);
  }

  @Delete(':id')
  @ApiOperation({summary: 'delete a owner [Only access for users logged with role admin/propietario]'})
  @ApiParam({name: 'id', type: 'Owner id', example: '60e92b59-6a6d-4f8b-baca-c9fde9d1313a'})
  @ApiResponse({status: 200, description: 'Return a message'})
  @ApiResponse({status: 409, description: 'Conflict'})
  @Roles(['admin', 'propietario'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async remove(@Param('id') id: string) {
    return await this.ownerService.remove(id);
  }
}
