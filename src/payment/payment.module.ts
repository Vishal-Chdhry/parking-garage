import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [PrismaService],
})
export class PaymentModule {}
