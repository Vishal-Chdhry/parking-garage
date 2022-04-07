import { IsNotEmpty } from 'class-validator';

export class calculatePaymentDto {
  @IsNotEmpty()
  reservation_id: number;
}
