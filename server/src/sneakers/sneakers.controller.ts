import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SneakersService } from './sneakers.service';
import { CreateSneakerDto } from './dto/create-sneaker.dto';
import { UpdateSneakerDto } from './dto/update-sneaker.dto';

@Controller('sneakers')
export class SneakersController {
  constructor(private readonly sneakersService: SneakersService) {}

  @Post()
  create(@Body() createSneakerDto: CreateSneakerDto) {
    return this.sneakersService.create(createSneakerDto);
  }

  @Get()
  findAll() {
    return this.sneakersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sneakersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSneakerDto: UpdateSneakerDto) {
    return this.sneakersService.update(+id, updateSneakerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sneakersService.remove(+id);
  }
}
