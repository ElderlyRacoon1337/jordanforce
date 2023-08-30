import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { SneakersModule } from './sneakers/sneakers.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:1488@cluster0.nu6j1es.mongodb.net/jordanforce?retryWrites=true&w=majority',
    ),
    AuthModule,
    SneakersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
