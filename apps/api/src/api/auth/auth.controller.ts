import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.serviсe';
import { RegistrationDto } from './dto/registration.dto';
import { LocalAuthGuard } from '../../security/guards/local.auth.guard';
import { JwtAuthGuard } from '../../security/guards/jwt.auth.guard';
import { UserResponse } from './responses/user.response';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokensResponse } from './responses/tokens.response';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor (
    private authService: AuthService,
  ) {}

  @Post('/register')
  @ApiOperation({ summary: 'Register user' })
  async register (
    @Body() body: RegistrationDto,
  ) {
    return this.authService.create(body);
  }

  @Post('verify/:token')
  @ApiOperation({ summary: 'Verify email' })
  @ApiOkResponse({ type: TokensResponse })
  async verify (
    @Param('token') token: string,
  ) {
    return this.authService.verifyEmail(token);
  }

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ type: TokensResponse })
  @Post('/login')
  async login (
    @Req() req: any,
  ) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/refresh')
  @ApiOperation({ summary: 'Refresh tokens' })
  @ApiOkResponse({ type: TokensResponse })
  async refresh (
    @Req() req: any,
  ) {
    return this.authService.getTokens(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  @ApiOperation({ summary: 'Get user' })
  @ApiOkResponse({ type: UserResponse })
  async getUser (
    @Req() req: any,
  ): Promise<UserResponse> {
    return this.authService.getUser(req.user);
  }
}
