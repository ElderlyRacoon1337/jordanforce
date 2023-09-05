export class UpdateOrderDto {
  sneakers?: string[];
  status?: 'notpaid' | 'paid' | 'indelivery' | 'delivered';
}
