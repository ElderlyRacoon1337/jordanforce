export class CreateSneakerDto {
  title: string;
  price: number;
  images: string[];
  sizes: number[];
  isAvailable?: boolean;
  model: string;
}
