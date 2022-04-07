import { Injectable } from '@nestjs/common';
import { SPOT_STATUS, VEHICLE_TYPE } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { calculatePaymentDto, cancelDto } from './dto';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async calculate_payment({ reservation_id }: calculatePaymentDto) {
    const reservation = await this.prisma.reservation.findUnique({
      where: {
        id: reservation_id,
      },
    });

    const spot = await this.prisma.spot.findUnique({
      where: {
        id: reservation.spot_id,
      },
    });

    const garage = await this.prisma.garage.findUnique({
      where: {
        id: spot.garage_id,
      },
    });

    if (spot.vehicle_type === VEHICLE_TYPE.SMALL)
      return { rate: garage.rate_small };
    else return { rate: garage.rate_large };
  }

  async cancel({ reservation_id }: cancelDto) {
    const reservation = await this.prisma.reservation.delete({
      where: {
        id: reservation_id,
      },
    });

    const spot = this.prisma.spot.update({
      where: {
        id: reservation.spot_id,
      },
      data: {
        status: SPOT_STATUS.EMPTY,
      },
    });

    return { spot };
  }
}
