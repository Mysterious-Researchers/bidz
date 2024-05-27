import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PhotoResponse } from '../auction/responses/auctions.resposne';

@ApiTags('Photo')
@Controller('/photos')
export class PhotoController {
  constructor (
    private readonly photoService: PhotoService
  ) {}

  @Post('/:index')
  @UseInterceptors(FileInterceptor('photo'))
  @ApiOperation({ summary: 'Create photo' })
  @ApiCreatedResponse({ type: PhotoResponse })
  async createPhoto (
    @UploadedFile() photo: Express.Multer.File,
    @Body() body: CreatePhotoDto,
  ) {
    return this.photoService.createPhoto(photo, body);
  }
}
