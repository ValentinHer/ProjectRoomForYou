import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { PropertyModule } from '../property/property.module';
@Module({
  imports: [TypeOrmModule.forFeature([File]), PropertyModule],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
