import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() signInDto: SignInDto, @Res() res: Response){
    const {access_token, ...otherData} = await this.authService.singIn(signInDto);

    res.cookie('token', access_token, {httpOnly: true});
    res.status(200).json({data: otherData});
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Res() res: Response){
    res.clearCookie('token');
    res.status(200).json({message: 'User session end'});
  }
}
