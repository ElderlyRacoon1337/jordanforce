import { Injectable } from '@nestjs/common';
import { CreateSneakerDto } from './dto/create-sneaker.dto';
import { UpdateSneakerDto } from './dto/update-sneaker.dto';

@Injectable()
export class SneakersService {
  create(createSneakerDto: CreateSneakerDto) {
    return 'This action adds a new sneaker';
  }

  findAll() {
    return `This action returns all sneakers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sneaker`;
  }

  update(id: number, updateSneakerDto: UpdateSneakerDto) {
    return `This action updates a #${id} sneaker`;
  }

  remove(id: number) {
    return `This action removes a #${id} sneaker`;
  }
}
