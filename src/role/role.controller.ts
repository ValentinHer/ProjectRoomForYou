import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @Roles(['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.roleService.create(createRoleDto);
  }

  @Get()
  @Roles(['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll() {
    return await this.roleService.findAll();
  }

  @Get(':id')
  @Roles(['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOne(@Param('id') id: string) {
    return await this.roleService.findOne(id);
  }
}
