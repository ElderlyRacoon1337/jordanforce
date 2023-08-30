import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (user?.password !== password) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const name = user.name;
    const payload = { sub: user._id, email: user.email };
    return {
      name,
      email,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(name: string, email: string, password: string): Promise<any> {
    const createdUser = await this.usersService.create({
      name,
      email,
      password,
    });
    if (!createdUser) {
      return;
    }
    const payload = { sub: createdUser._id, email: createdUser.email };
    return {
      name,
      email,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getProfile(id: string): Promise<any> {
    const userData = await this.usersService.findOne(id);
    const { name, email } = userData;
    return { name, email };
  }
}
