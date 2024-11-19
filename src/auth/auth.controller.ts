import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(@Body() signInDto: SignInDto, @Res() res: Response){
    const {access_token, rol} = await this.authService.singIn(signInDto);

    res.cookie('token', access_token, {httpOnly: true});
    res.status(200).json({userRol: rol});
  }

}
