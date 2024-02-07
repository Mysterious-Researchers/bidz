import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.servise';
import { AuthDto } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async createUser(@Body() body: AuthDto) {
    return this.authService.create(body);
  }

  @Get()
  async getUsers() {
    return this.authService.findAll();
  }
}
