import { IsNotEmpty } from 'class-validator';

export class reserverSpotDto {
  @IsNotEmpty()
  garage_id: number;

  start_time: Date | null;

  @IsNotEmpty()
  end_time: Date;

  @IsNotEmpty()
  vehicle_id: number;
}
