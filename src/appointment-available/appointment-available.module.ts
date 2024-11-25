import { Module } from '@nestjs/common';
import { AppointmentAvailableService } from './appointment-available.service';
import { AppointmentAvailableController } from './appointment-available.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentAvailable } from './entities/appointment-available.entity';
import { OwnerModule } from '../owner/owner.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentAvailable]), OwnerModule, UserModule],
  controllers: [AppointmentAvailableController],
  providers: [AppointmentAvailableService],
})
export class AppointmentAvailableModule {}
