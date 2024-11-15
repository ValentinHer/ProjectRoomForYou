import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { console } from 'inspector';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async create( @UploadedFiles() files: Array<Express.Multer.File>, @Body() createFileDto: CreateFileDto) {
    await this.fileService.create(files, createFileDto);
  }

  @Get()
  findAll() {
    return this.fileService.findAll();
  }
}
