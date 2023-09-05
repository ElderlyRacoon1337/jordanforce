import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(req.cookies.access_token, createOrderDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.ordersService.findAll(req.cookies.access_token);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.ordersService.findOne(req.cookies.access_token, id);
  }

  @UseGuards(AuthGuard)
  @Get('user/:id')
  findOrdersByUser(@Request() req, @Param('id') id: string) {
    return this.ordersService.findOrdersByUser(req.cookies.access_token, id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.ordersService.remove(req.cookies.access_token, id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(
      req.cookies.access_token,
      id,
      updateOrderDto,
    );
  }
}
