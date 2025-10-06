import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email address used for authentication',
    example: 'john.kowal@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password used for authentication (minimum 6 characters)',
    example: 'SecurePass123!',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
