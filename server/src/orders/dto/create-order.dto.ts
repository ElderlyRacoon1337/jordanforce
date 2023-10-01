interface sneakersType {
  id: string;
  size: number;
  price: number;
}

export class CreateOrderDto {
  sneakers: sneakersType[];
  status: 'notpaid' | 'paid' | 'indelivery' | 'delivered';
}
