import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { OwnerModule } from '../owner/owner.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Property]), OwnerModule, UserModule],
  controllers: [PropertyController],
  providers: [PropertyService],
  exports: [PropertyService]
})
export class PropertyModule {}
