import { IsNotEmpty } from 'class-validator';

export class cancelDto {
  @IsNotEmpty()
  reservation_id: number;
}
