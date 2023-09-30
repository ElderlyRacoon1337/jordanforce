export class CreateOrderDto {
  sneakers: string[];
  status: 'notpaid' | 'paid' | 'indelivery' | 'delivered';
}
