import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';
import { AuthRole } from '@prisma/client';

export class RegisterDto {
  @ApiProperty({
    description: 'Email address of the new user',
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
    description: 'Password for the new account (minimum 6 characters)',
    example: 'StrongPass123!',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({
    description: 'Optional user role, defaults to USER',
    enum: AuthRole,
    example: AuthRole.USER,
  })
  @IsOptional()
  @IsEnum(AuthRole)
  authRole?: AuthRole;
}
