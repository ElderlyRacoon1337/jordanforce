import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateSneakerDto } from './dto/create-sneaker.dto';
import { UpdateSneakerDto } from './dto/update-sneaker.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Sneakers } from './schemas/sneakers.schema';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/users.schema';
import { UsersService } from 'src/users/users.service';
import { jwtDecode } from 'src/auth/jwt.decode';

@Injectable()
export class SneakersService {
  constructor(
    @InjectModel(Sneakers.name) private sneakersModel: Model<Sneakers>,
    private usersService: UsersService,
  ) {}

  create(createSneakerDto: CreateSneakerDto) {
    const sneakers = new this.sneakersModel(createSneakerDto);
    return sneakers.save();
  }

  async findAll() {
    return this.sneakersModel.find();
  }

  findOne(id: string) {
    return this.sneakersModel.findById(id);
  }

  async update(token: string, id: string, updateSneakerDto: UpdateSneakerDto) {
    const userId = jwtDecode(token);
    const user = await this.usersService.findOne(userId);
    if (!user.isAdmin) {
      throw new ForbiddenException("You don't have permission to do this");
    }
    await this.sneakersModel.findByIdAndUpdate(id, updateSneakerDto);
    const updatedSneakers = await this.sneakersModel.findById(id);
    return updatedSneakers;
  }

  async remove(token: string, id: string) {
    const userId = jwtDecode(token);
    const user = await this.usersService.findOne(userId);
    if (!user.isAdmin) {
      throw new ForbiddenException("You don't have permission to do this");
    }
    await this.sneakersModel.findByIdAndDelete(id);
    return { message: `Sneakers successfully deleted` };
  }
}
