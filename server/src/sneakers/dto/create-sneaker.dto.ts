export class CreateSneakerDto {
  title: string;
  minPrice: number;
  images: string[];
  sizes: number[];
  isAvailable?: boolean;
  model: string;
  selectedSize?: number;
  selectedPrice?: number;
}
