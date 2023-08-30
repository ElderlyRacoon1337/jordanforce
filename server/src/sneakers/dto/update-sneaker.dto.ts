import { PartialType } from '@nestjs/mapped-types';
import { CreateSneakerDto } from './create-sneaker.dto';

export class UpdateSneakerDto extends PartialType(CreateSneakerDto) {
  title?: string;
  price?: number;
  sizes?: number[];
  model?: string;
  isAvailable?: boolean;
  imageUrl?: string;
}
