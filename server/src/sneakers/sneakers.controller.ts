import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  Request,
  Response,
  UploadedFiles,
} from '@nestjs/common';
import { SneakersService } from './sneakers.service';
import { CreateSneakerDto } from './dto/create-sneaker.dto';
import { UpdateSneakerDto } from './dto/update-sneaker.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { AuthGuard } from 'src/auth/auth.guard';
import { editFileName, imageFileFilter } from './utils/utils';

let fileName = '';

@Controller('sneakers')
export class SneakersController {
  constructor(private readonly sneakersService: SneakersService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createSneakerDto: CreateSneakerDto) {
    return this.sneakersService.create(createSneakerDto);
  }

  @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './images',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  uploadFile(@UploadedFiles() files) {
    const fileUrls = files.map((file: { filename: string }) => {
      return join('images', file.filename);
    });
    return { message: 'Images uploaded successfully', images: fileUrls };
  }

  @Get('images')
  getImage(@Response() res) {
    return res.sendFile();
  }

  @Get()
  findAll() {
    return this.sneakersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sneakersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateSneakerDto: UpdateSneakerDto,
  ) {
    return this.sneakersService.update(
      req.cookies.access_token,
      id,
      updateSneakerDto,
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.sneakersService.remove(req.cookies.access_token, id);
  }
}
