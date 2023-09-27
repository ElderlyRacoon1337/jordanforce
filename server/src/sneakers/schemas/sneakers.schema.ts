import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type SneakersDocument = HydratedDocument<Sneakers>;

interface Size {
  size: number;
  price: number;
}

@Schema({ timestamps: true })
export class Sneakers {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  images: string[];

  @Prop({ required: true })
  sizes: Size[];

  @Prop({ required: false, default: false })
  isAvailable?: boolean;

  @Prop({ required: true })
  model: string;
}

export const SneakersSchema = SchemaFactory.createForClass(Sneakers);
