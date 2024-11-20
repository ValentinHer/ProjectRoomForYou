import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AppointmentModule } from './appointment/appointment.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyModule } from './property/property.module';
import { AppointmentAvailableModule } from './appointment-available/appointment-available.module';
import { RoleModule } from './role/role.module';
import { OwnerModule } from './owner/owner.module';
import { ClientModule } from './client/client.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,
  }),  
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT?? '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/**/*.entity.{ts,js}'],
    synchronize: true
    // migrations: ["src/database/migrations/*.ts"],
    // migrationsTableName: "RoomForYou_migration_table",
    
  }),
    RoleModule,
    UserModule,
    OwnerModule, 
    ClientModule, 
    AuthModule,
    PropertyModule, 
    AppointmentAvailableModule, 
    AppointmentModule, 
    FileModule
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
 