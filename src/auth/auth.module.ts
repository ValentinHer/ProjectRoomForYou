import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync(
      {
        global: true,
        useFactory: () => ({
          secret: process.env.JWT_SECRET_KEY,
          signOptions: { expiresIn: '1h' }
        })
      }
    )],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
