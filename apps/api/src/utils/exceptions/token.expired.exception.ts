import { HttpException, HttpStatus } from '@nestjs/common';

export class TokenExpiredException extends HttpException {
  constructor () {
    super('Token has expired', HttpStatus.GONE);
  }
}
