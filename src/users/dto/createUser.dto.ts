import { IsString, IsEmail, IsNotEmpty, MinLength, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const roles = ['READ', 'WRITE', 'ADMIN'] as const;
export type ROLES = typeof roles[number];

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty()
  password: string;

  @IsIn(roles)
  @ApiProperty()
  role: string;
}
