import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class EmailDuplicateGuard implements CanActivate {
  constructor(@InjectRepository(User) private userRepository: Repository<User>){}

  async canActivate(
    context: ExecutionContext,
  ):Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: CreateUserDto = request.body;

    const emailFind = await this.userRepository.findOne({
      where: {
        email: user.email
      }
    })

    if(emailFind) throw new HttpException('Email already get use', HttpStatus.CONFLICT);

    return true;
  }
}
