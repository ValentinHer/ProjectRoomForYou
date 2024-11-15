import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(signInDto: SignInDto, res: Response): Promise<void>;
}
