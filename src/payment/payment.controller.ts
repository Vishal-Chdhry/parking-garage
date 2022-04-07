import { Body, Controller, Post } from '@nestjs/common';
import { calculatePaymentDto, cancelDto } from './dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post('calculate_payment')
  calculate_payment(@Body() dto: calculatePaymentDto) {
    return this.paymentService.calculate_payment(dto);
  }

  @Post('cancel')
  cancel(@Body() dto: cancelDto) {
    return this.paymentService.cancel(dto);
  }
}
