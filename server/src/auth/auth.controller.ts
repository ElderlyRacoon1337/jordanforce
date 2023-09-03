import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Request,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Response() res, @Body() signInDto: Record<string, any>) {
    return this.authService.signIn(res, signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Response() res, @Body() signUpDto: Record<string, any>) {
    return this.authService.signUp(
      res,
      signUpDto.name,
      signUpDto.email,
      signUpDto.password,
    );
  }

  @Get('profile')
  getProfile(@Request() req) {
    return this.authService.getProfile(req);
  }
}
