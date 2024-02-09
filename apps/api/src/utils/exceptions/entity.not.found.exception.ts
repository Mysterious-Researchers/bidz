import { HttpException, HttpStatus } from '@nestjs/common';

export class EntityNotFoundException extends HttpException {
  constructor(entity: string) {
    super(`${entity} not found`, HttpStatus.NOT_FOUND);
  }
}
