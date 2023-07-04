
import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty()
  password: string;
}
