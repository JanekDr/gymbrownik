import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email address of the user (must be unique)',
    example: 'john.kowal@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Kowalsky',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Password for the user account (minimum 6 characters)',
    example: 'strongPassword123',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;
}
