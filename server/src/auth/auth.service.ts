import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(res: Response, email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (user?.password !== password) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const payload = { sub: user._id };
    res
      .cookie('user', payload, {
        expires: new Date(Date.now() + 3600000),
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
    res
      .cookie('user', payload, {
        expires: new Date(Date.now() + 3600000),
      })
      .json(createdUser);
  }

  async getProfile(req: Request): Promise<any> {
    const id = req.cookies.user.sub;
    const userData = await this.usersService.findOne(id);
    return { userData };
  }
}
