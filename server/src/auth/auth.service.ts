import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { jwtDecode } from './jwt.decode';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(res: Response, email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (user?.password !== password) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const payload = { sub: user._id };
    const token = this.jwtService.sign(payload);
    res
      .cookie('access_token', token, {
        maxAge: 9000000000,
      })
      .json(user);
  }

  async signUp(
    res: Response,
    name: string,
    email: string,
    password: string,
  ): Promise<any> {
    const createdUser = await this.usersService.create({
      name,
      email,
      password,
    });
    if (!createdUser) {
      return;
    }
    const payload = { sub: createdUser._id };
    const token = this.jwtService.sign(payload);
    res
      .cookie('access_token', token, {
        maxAge: 9000000000,
      })
      .json(createdUser);
  }

  async getProfile(req: Request): Promise<any> {
    const token = req.cookies.access_token;
    const id = jwtDecode(token);
    const userData = await this.usersService.findOne(id);
    return userData;
  }
}
