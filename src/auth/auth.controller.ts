import { Body, Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

  @HttpCode(200)  
  @Post('/login')
  @UseGuards(AuthGuard('local'))
  login(@Req() req,@Body() loginDto:LoginDto){
    const user: User = req.user;
    return this.authService.login(user,loginDto)
  }
}
