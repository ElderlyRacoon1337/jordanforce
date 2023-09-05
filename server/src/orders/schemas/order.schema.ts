import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type OrdersDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({
    ref: 'Sneakers',
    required: true,
  })
  sneakers: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: mongoose.Schema.Types.ObjectId;

  @Prop()
  status: 'notpaid' | 'paid' | 'indelivery' | 'delivered';
}

export const OrdersSchema = SchemaFactory.createForClass(Order);
