import { Module } from '@nestjs/common';
import { SneakersService } from './sneakers.service';
import { SneakersController } from './sneakers.controller';

@Module({
  controllers: [SneakersController],
  providers: [SneakersService]
})
export class SneakersModule {}
