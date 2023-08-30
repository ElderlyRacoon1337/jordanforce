import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  // id: mongoose.Schema.Types.ObjectId;
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false, default: false })
  isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
