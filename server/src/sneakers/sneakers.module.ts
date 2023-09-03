import { Module } from '@nestjs/common';
import { SneakersService } from './sneakers.service';
import { SneakersController } from './sneakers.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { Sneakers, SneakersSchema } from './schemas/sneakers.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: Sneakers.name, schema: SneakersSchema },
    ]),
  ],
  controllers: [SneakersController],
  providers: [SneakersService],
  exports: [SneakersService],
})
export class SneakersModule {}
