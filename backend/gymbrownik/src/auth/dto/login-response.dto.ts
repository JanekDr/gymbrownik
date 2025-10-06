import { ApiProperty } from '@nestjs/swagger';

class UserInfo {
  @ApiProperty({
    description: 'Unique identifier of the logged-in user',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Email address of the logged-in user',
    example: 'john.kowal@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Full name of the logged-in user',
    example: 'John Kowalsky',
  })
  name: string;

  @ApiProperty({
    description: 'Role assigned to the user (ADMIN or USER)',
    example: 'USER',
  })
  role: string;
}

export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT access token used for authentication',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  token: string;

  @ApiProperty({
    description: 'Basic information about the authenticated user',
    type: UserInfo,
  })
  user: UserInfo;
}
