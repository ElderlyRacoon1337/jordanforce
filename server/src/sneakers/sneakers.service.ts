// sneakers.service.ts

import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateSneakerDto } from './dto/create-sneaker.dto';
import { UpdateSneakerDto } from './dto/update-sneaker.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Sneakers, SneakersDocument } from './schemas/sneakers.schema';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { jwtDecode } from 'src/auth/jwt.decode';
import axios from 'axios';

@Injectable()
export class SneakersService {
  constructor(
    @InjectModel(Sneakers.name) private sneakersModel: Model<SneakersDocument>,
    private usersService: UsersService,
  ) {}

  countPrice(price: number) {
    const result = Math.ceil(price / 100) * 100;
    if (result <= 20000) {
      return result + 5000;
    } else if (result <= 30000) {
      return result + 7000;
    } else {
      return result + 12000;
    }
  }

  async getExchangeRate(): Promise<number> {
    try {
      const response = await axios.get(
        'https://v6.exchangerate-api.com/v6/021b96e141aa78b7b9024e29/latest/CNY',
      );

      if (
        !response.data ||
        !response.data.conversion_rates ||
        response.data.conversion_rates === null
      ) {
        console.error('Invalid exchange rate data. Response:', response.data);
        throw new Error('Invalid exchange rate data');
      }

      const conversionRates = response.data.conversion_rates;

      // Проверка наличия необходимых курсов
      if (!conversionRates.RUB) {
        console.error(
          'Exchange rate for RUB not available. Conversion rates:',
          conversionRates,
        );
        throw new Error('Exchange rate for RUB not available');
      }

      // Получение курса CNY к RUB
      const cnyToRub = conversionRates.RUB;

      return cnyToRub;
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
      throw new Error('Could not fetch exchange rate');
    }
  }

  async create(
    token: string,
    createSneakerDto: CreateSneakerDto,
  ): Promise<SneakersDocument> {
    const userId = jwtDecode(token);
    const user = await this.usersService.findOne(userId);
    if (!user.isAdmin) {
      throw new ForbiddenException("You don't have permission to do this");
    }
    const sneakers = new this.sneakersModel(createSneakerDto);
    return sneakers.save();
  }

  async findAll(
    sortBy: string,
    model: string,
    search: string = '',
  ): Promise<Sneakers[]> {
    let sortOption: { [key: string]: 1 | -1 } = {};

    switch (sortBy) {
      case 'relevance':
        sortOption = { _id: -1 };
        break;
      case 'popularity':
        sortOption = { ordered: -1 };
        break;
      case 'priceASC':
        sortOption = { price: 1 };
        break;
      case 'priceDESC':
        sortOption = { price: -1 };
        break;
      default:
        sortOption = { _id: -1 };
    }

    const query: any = {};
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (model) {
      query.model = { $regex: model, $options: 'i' };
    }

    const sneakersList = await this.sneakersModel
      .find(query)
      .sort(sortOption)
      .lean()
      .exec();
    const exchangeRate = await this.getExchangeRate();

    // Iterate over sneakersList and update prices in sizes array
    const updatedSneakersList = await Promise.all(
      sneakersList.map(async (sneaker) => {
        const updatedSizes = await Promise.all(
          sneaker.sizes.map(async (size) => {
            return {
              ...size,
              price: this.countPrice(size.price * exchangeRate),
            };
          }),
        );

        return {
          ...sneaker,
          sizes: updatedSizes,
          price: this.countPrice(sneaker.price * exchangeRate),
        };
      }),
    );

    return updatedSneakersList;
  }

  async findOne(id: string): Promise<Sneakers> {
    const sneaker = await this.sneakersModel.findById(id).lean();
    if (!sneaker) {
      throw new Error('Sneaker not found');
    }

    const exchangeRate = await this.getExchangeRate();

    const updatedSizes = await Promise.all(
      sneaker.sizes.map(async (size) => {
        return {
          ...size,
          price: this.countPrice(size.price * exchangeRate),
        };
      }),
    );

    return {
      ...sneaker,
      sizes: updatedSizes,
      price: this.countPrice(sneaker.price * exchangeRate),
    };
  }

  async update(
    token: string,
    id: string,
    updateSneakerDto: UpdateSneakerDto,
  ): Promise<SneakersDocument> {
    const userId = jwtDecode(token);
    const user = await this.usersService.findOne(userId);
    if (!user.isAdmin) {
      throw new ForbiddenException("You don't have permission to do this");
    }
    await this.sneakersModel.findByIdAndUpdate(id, updateSneakerDto);
    const updatedSneakers = await this.sneakersModel.findById(id);
    return updatedSneakers;
  }

  async remove(token: string, id: string): Promise<{ message: string }> {
    const userId = jwtDecode(token);
    const user = await this.usersService.findOne(userId);
    if (!user.isAdmin) {
      throw new ForbiddenException("You don't have permission to do this");
    }
    await this.sneakersModel.findByIdAndDelete(id);
    return { message: `Sneakers successfully deleted` };
  }
}
