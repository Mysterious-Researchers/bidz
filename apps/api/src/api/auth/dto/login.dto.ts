import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'User email' })
    email: string;

  @ApiProperty({ description: 'User password' })
    password: string;
}
