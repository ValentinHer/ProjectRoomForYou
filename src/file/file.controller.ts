import { Controller, Get, Post, Body, Param, UseInterceptors, UploadedFiles, UseGuards } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @Roles(['admin, propietario'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FilesInterceptor('files'))
  async create( @UploadedFiles() files: Array<Express.Multer.File>, @Body() createFileDto: CreateFileDto) {
    await this.fileService.create(files, createFileDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findAll(@Param('id') id: string) {
    return await this.fileService.findAll(id);
  }
}
