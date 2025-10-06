import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the user',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.kowal@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Kowalsky',
  })
  name: string;

  @ApiProperty({
    description: 'Role assigned to the user (ADMIN or USER)',
    example: 'USER',
  })
  role: string;
}