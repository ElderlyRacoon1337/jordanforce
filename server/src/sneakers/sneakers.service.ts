import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateSneakerDto } from './dto/create-sneaker.dto';
import { UpdateSneakerDto } from './dto/update-sneaker.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Sneakers } from './schemas/sneakers.schema';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { jwtDecode } from 'src/auth/jwt.decode';

@Injectable()
export class SneakersService {
  constructor(
    @InjectModel(Sneakers.name) private sneakersModel: Model<Sneakers>,
    private usersService: UsersService,
  ) {}

  async create(token: string, createSneakerDto: CreateSneakerDto) {
    const userId = jwtDecode(token);
    const user = await this.usersService.findOne(userId);
    if (!user.isAdmin) {
      throw new ForbiddenException("You don't have permission to do this");
    }
    const sneakers = new this.sneakersModel(createSneakerDto);
    return sneakers.save();
  }

  async findAll(sortBy: string, model: string, search: string = '') {
    let sortOption: { [key: string]: 1 | -1 } = {};

    switch (sortBy) {
      case 'relevance':
        sortOption = { _id: -1 }; // сортировка по умолчанию (релевантность)
        break;
      case 'popularity':
        sortOption = { ordered: -1 };
        break;
      case 'priceAsc':
        sortOption = { price: 1 };
        break;
      case 'priceDesc':
        sortOption = { price: -1 };
        break;
      default:
        sortOption = { _id: -1 }; // сортировка по умолчанию (релевантность)
    }

    const query: any = {};
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (model) {
      query.model = { $regex: model, $options: 'i' };
    }

    return this.sneakersModel.find(query).sort(sortOption).exec();
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
