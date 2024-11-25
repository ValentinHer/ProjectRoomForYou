import { forwardRef, Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { ClientModule } from '../client/client.module';
import { PropertyModule } from '../property/property.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment]), ClientModule, PropertyModule, UserModule],
  controllers: [AppointmentController],
  providers: [AppointmentService]
})
export class AppointmentModule {}
