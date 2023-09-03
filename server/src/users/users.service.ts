import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import { Model } from 'mongoose';
import { jwtDecode } from 'src/auth/jwt.decode';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new ForbiddenException(
        `User with email ${createUserDto.email} already exists, try another one`,
      );
    }
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    console.log(id);
    const user = await this.userModel.findOne({ _id: id });
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async remove(token: string, id: string) {
    const userId = jwtDecode(token);
    const user = await this.userModel.findById(userId);
    if (!user.isAdmin) {
      throw new ForbiddenException("You don't have permission to do this");
    }
    await this.userModel.findByIdAndDelete(id);
    return { message: `Profile successfully deleted` };
  }
}
