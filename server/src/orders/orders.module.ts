import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrdersSchema } from './schemas/order.schema';
import { SneakersModule } from 'src/sneakers/sneakers.module';

@Module({
  imports: [
    UsersModule,
    SneakersModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrdersSchema }]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
