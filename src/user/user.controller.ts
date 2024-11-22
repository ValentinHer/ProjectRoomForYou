import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EmailDuplicateGuard } from './guards/email-duplicate.guard';
import { PaginationDto } from '../common/dto/pagination.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UseGuards(EmailDuplicateGuard)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @Roles(['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll(@Query() query: PaginationDto) {
    return await this.userService.findAll(query);
  }

  @Get(':id')
  @Roles(['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}
