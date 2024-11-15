import { CanActivate, ExecutionContext } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
export declare class EmailDuplicateGuard implements CanActivate {
    private userRepository;
    constructor(userRepository: Repository<User>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
