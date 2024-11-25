import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { PropertyModule } from '../property/property.module';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [TypeOrmModule.forFeature([File]), PropertyModule, UserModule],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
