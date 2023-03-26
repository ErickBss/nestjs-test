import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
