import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class editUserDto {
  @IsNotEmpty()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  first_name?: string;

  @IsString()
  @IsOptional()
  last_name?: string;
}
