import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>, private jwtService: JwtService){}

  async singIn(user: SignInDto){
    const userFound =  await this.userRepository.findOne({
      where: {email: user.email}, 
      relations: {
        role: true
      }
    });

    if(!userFound) throw new UnauthorizedException("Check Your Email/Password");

    const passwordMatch = await bcrypt.compare(user.password, userFound.password);
    if(!passwordMatch) throw new UnauthorizedException("Check Your Email/Password");

    const payload = { sub: userFound.id};
    
    const access_token = this.jwtService.sign(payload);

    return {access_token: access_token, userId: userFound.id, rol: userFound.role.name,};
  }

}
