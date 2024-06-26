import { Controller, Get, Query, Res } from '@nestjs/common';
import * as Jimp from 'jimp';
import { Response } from 'express';
import { join } from 'path';

@Controller('images')
export class ImagesController {
  @Get('process')
  async processImage(@Query('src') src: string, @Res() res: Response) {
    const imagePath = join(__dirname, '..', 'images', src);

    const image = await Jimp.read(imagePath);
    image.scan(
      0,
      0,
      image.bitmap.width,
      image.bitmap.height,
      function (x, y, idx) {
        const red = this.bitmap.data[idx + 0];
        const green = this.bitmap.data[idx + 1];
        const blue = this.bitmap.data[idx + 2];

        const whiteThreshold = 240;
        if (
          red > whiteThreshold &&
          green > whiteThreshold &&
          blue > whiteThreshold
        ) {
          this.bitmap.data[idx + 0] = 0;
          this.bitmap.data[idx + 1] = 0;
          this.bitmap.data[idx + 2] = 0;
        }
      },
    );

    const buffer = await image.getBufferAsync(Jimp.MIME_PNG);
    res.set('Content-Type', Jimp.MIME_PNG);
    res.send(buffer);
  }
}
