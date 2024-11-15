import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    singIn(user: SignInDto): Promise<{
        access_token: string;
        rol: string;
    }>;
}
