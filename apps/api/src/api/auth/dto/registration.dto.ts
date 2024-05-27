import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegistrationDto {
  @ApiProperty({ description: 'User first name' })
  @IsNotEmpty()
    firstName: string;

  @ApiPropertyOptional({ description: 'User middle name' })
  @IsOptional()
    middleName: string;

  @ApiProperty({ description: 'User last name' })
  @IsNotEmpty()
    lastName: string;

  @ApiProperty({ description: 'User password' })
  @IsNotEmpty()
    password: string;

  @ApiProperty({ description: 'User email' })
  @IsNotEmpty()
  @IsEmail()
    email: string;
}
