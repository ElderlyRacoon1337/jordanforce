import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Body() signUpDto: Record<string, any>) {
    return this.authService.signUp(
      signUpDto.name,
      signUpDto.email,
      signUpDto.password,
    );
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.authService.getProfile(req.user.sub);
  }
}
