import { Controller, Get, Post, Body, Param, UseInterceptors, UploadedFiles, UseGuards, Req } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiOperation, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Request } from 'express';
import { json } from 'stream/consumers';
import { ParseJsonPipe } from './pipes/parse-json.pipe';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @Post('upload')
  @ApiOperation({ summary: `Upload files to property [Only access for users logged who have role admin/propietario]` })
  @ApiBody({ description: 'Data to send in request body', type: CreateFileDto })
  @ApiResponse({ status: 200, description: 'Return user created' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @Roles(['admin', 'propietario'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FilesInterceptor('files'))
  async create(@UploadedFiles() files: Array<Express.Multer.File>, @Body('CreateFileDto', new ParseJsonPipe()) createFileDto) {
    await this.fileService.create(files, createFileDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get files to property' })
  @ApiParam({ name: 'id', type: 'Property id', example: '60e92b59-6a6d-4f8b-baca-c9fde9d1313a' })
  @ApiResponse({ status: 200, description: 'Return files found to Property' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @UseGuards(JwtAuthGuard)
  async findAll(@Param('id') id: string) {
    return await this.fileService.findAll(id);
  }
}
