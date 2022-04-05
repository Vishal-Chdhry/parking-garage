import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createAccountDto, loginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('create_account')
  signup(@Body() dto: createAccountDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  signin(@Body() dto: loginDto) {
    return this.authService.signin(dto);
  }
}
