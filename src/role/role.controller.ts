import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiBody, ApiCookieAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiOperation({summary: 'Create role for users [Only access for users logged who have role admin]'})
  @ApiBody({type: CreateRoleDto, description: 'Data to send in request body'})
  @ApiResponse({status: 200, description: 'Return role created'})
  @ApiResponse({status: 409, description: 'Conflict'})
  @Roles(['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.roleService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({summary: 'Get all roles [Only access for users logged who have role admin]'})
  @ApiResponse({status: 200, description: 'Return array roles/array empty'})
  @Roles(['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll() {
    return await this.roleService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get role by id [Only access for users logged who have role admin]'})
  @ApiParam({name: 'id', description: 'Role id', example: '60e92b59-6a6d-4f8b-baca-c9fde9d1313a'})
  @ApiResponse({status: 200, description: 'Return role Found'})
  @ApiResponse({status: 404, description: 'Not Found'})
  @Roles(['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOne(@Param('id') id: string) {
    return await this.roleService.findOne(id);
  }
}
