import { VEHICLE_TYPE } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class freeSpotDto {
  @IsNotEmpty()
  garage_id: number;

  @IsNotEmpty()
  vehicle_type: VEHICLE_TYPE;

  @IsNotEmpty()
  start_time: Date;
}
