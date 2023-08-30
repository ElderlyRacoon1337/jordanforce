export class CreateSneakerDto {
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  isAvailable?: boolean;
  model: string;
}
