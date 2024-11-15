import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentAvailableDto } from './create-appointment-available.dto';

export class UpdateAppointmentAvailableDto extends PartialType(CreateAppointmentAvailableDto) {}
