import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class createAccountDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  last_name: string;
}
