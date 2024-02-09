import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.serviсe';
import { AuthDto } from '../dto/auth.dto';
import { LocalAuthGuard } from '../../security/guards/local.auth.guard';
import { JwtAuthGuard } from '../../security/guards/jwt.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() body: AuthDto) {
    return this.authService.create(body);
  }

  @Post('verify/:token')
  async verify(@Param('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/refresh')
  async refresh(@Req() req) {
    return this.authService.getTokens(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getUser(@Req() req) {
    return this.authService.getUser(req.user);
  }
}
