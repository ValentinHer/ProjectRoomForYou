import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EmailDuplicateGuard } from './guards/email-duplicate.guard';
import { PaginationDto } from '../common/dto/pagination.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiOperation({summary: 'Create user'})
  @ApiBody({description: 'Data to send in request body', type: CreateUserDto})
  @ApiResponse({status: 200, description: 'Return user created'})
  @ApiResponse({status: 409, description: 'Conflict'})
  @UseGuards(EmailDuplicateGuard)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({summary: 'Get all users [Only access for users logged who have role admin]'})
  @ApiQuery({name: 'PaginationDto', type: PaginationDto})
  @ApiResponse({status: 200, description: 'Return array users/array empty'})
  @Roles(['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll(@Query() query: PaginationDto) {
    return await this.userService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({summary: 'Get a user [Only access for users logged who have role admin]'})
  @ApiParam({name: 'id', type: 'User id', example: '60e92b59-6a6d-4f8b-baca-c9fde9d1313a'})
  @ApiResponse({status: 200, description: 'Return user found'})
  @ApiResponse({status: 404, description: 'Not Found'})
  @Roles(['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update a user [Only access for users logged]'})
  @ApiParam({name: 'id', type: 'User id', example: '60e92b59-6a6d-4f8b-baca-c9fde9d1313a'})
  @ApiBody({description: 'Update someone this data [optional]', type: CreateUserDto})
  @ApiResponse({status: 200, description: 'Return user update'})
  @ApiResponse({status: 409, description: 'Conflict'})
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'delete a user [Only access for users logged]'})
  @ApiParam({name: 'id', type: 'User id', example: '60e92b59-6a6d-4f8b-baca-c9fde9d1313a'})
  @ApiResponse({status: 200, description: 'Return a message'})
  @ApiResponse({status: 409, description: 'Conflict'})
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}
