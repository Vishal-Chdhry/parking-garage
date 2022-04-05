import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PaymentModule } from './payment/payment.module';
import { SpotModule } from './spot/spot.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PaymentModule,
    SpotModule,
    PrismaModule,
    UserModule,
  ],
})
export class AppModule {}
