import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { Order } from './schemas/order.schema';
import { jwtDecode } from 'src/auth/jwt.decode';
import { SneakersService } from 'src/sneakers/sneakers.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private ordersModel: Model<Order>,
    private usersService: UsersService,
    private sneakersService: SneakersService,
  ) {}

  async create(token: string, createOrderDto: CreateOrderDto) {
    const userId = jwtDecode(token);
    const user = await this.usersService.findOne(userId);
    if (!user) return;
    const createdOrder = new this.ordersModel({
      sneakers: createOrderDto.sneakers,
      user: userId,
    });
    return createdOrder.save();
  }

  async findAll(token: string) {
    const userId = jwtDecode(token);
    const user = await this.usersService.findOne(userId);
    if (!user) return;
    if (!user.isAdmin) {
      throw new ForbiddenException('No access');
    }
    const orders = await this.ordersModel
      .find()
      .populate('user')
      .populate('sneakers');

    return orders;
  }

  async findOne(token: string, id: string) {
    const userId = jwtDecode(token);
    const order = await this.ordersModel.findById(id);
    const user = await this.usersService.findOne(userId);

    if (!user || !order) return;
    if (String(order.user) === userId || user.isAdmin) {
      return order;
    } else {
      throw new ForbiddenException('No access');
    }
  }

  async findOrdersByUser(token: string, id: string) {
    const userId = jwtDecode(token);
    const user = await this.usersService.findOne(userId);
    if (userId === id || user.isAdmin) {
      return this.ordersModel.find({ user: id });
    } else {
      throw new ForbiddenException('No access');
    }
  }

  async remove(token: string, id: string) {
    const userId = jwtDecode(token);
    const user = await this.usersService.findOne(userId);
    if (!user.isAdmin) throw new ForbiddenException('No access');

    await this.ordersModel.findByIdAndDelete(id);
    return { message: 'Order successfully deleted' };
  }
}
