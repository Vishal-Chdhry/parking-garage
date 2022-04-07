import { ForbiddenException, Injectable } from '@nestjs/common';
import { Spot, SPOT_STATUS, VEHICLE_TYPE } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { reserverSpotDto } from './dto';
import { freeSpotDto } from './dto/free-spot.dto';

@Injectable()
export class SpotService {
  constructor(private prisma: PrismaService) {}

  async freespots({ garage_id, vehicle_type }: freeSpotDto) {
    let spots: Spot[];
    if (vehicle_type === VEHICLE_TYPE.LARGE) {
      spots = await this.prisma.spot.findMany({
        where: {
          garage_id,
          vehicle_type,
          status: SPOT_STATUS.EMPTY,
        },
      });
    } else {
      spots = await this.prisma.spot.findMany({
        where: {
          garage_id,
          vehicle_type,
          status: SPOT_STATUS.EMPTY,
        },
      });
    }
    if (!spots) throw new ForbiddenException('No spots found');
    return { spots };
  }

  async reserve({
    garage_id,
    start_time,
    end_time,
    vehicle_id,
  }: reserverSpotDto) {
    const spot = await this.prisma.spot.findFirst({
      where: {
        garage_id,
        status: SPOT_STATUS.EMPTY,
      },
    });
    if (!spot) throw new ForbiddenException('No spots found');

    const updated_spot = await this.prisma.spot.update({
      where: {
        id: spot.id,
      },
      data: {
        status: SPOT_STATUS.RESERVED,
      },
    });
    const reservation = await this.prisma.reservation.create({
      data: {
        garage_id: updated_spot.garage_id,
        spot_id: updated_spot.id,
        start: start_time,
        end: end_time,
        paid: false,
        vehicle_id,
      },
    });
    return { reservation };
  }
}
