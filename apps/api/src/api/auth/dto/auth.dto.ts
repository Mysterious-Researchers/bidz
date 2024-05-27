import { IsString, IsEmail } from 'class-validator';

export class AuthDto {
  @IsString()
    firstName: string;

  @IsString()
    middleName: string;

  @IsString()
    lastName: string;

  @IsString()
    password: string;

  @IsEmail()
    email: string;
}
