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

@Controller('photos')
export class PhotoController {
  constructor (private readonly photoService: PhotoService) {}

  @Post('/:index')
  @UseInterceptors(FileInterceptor('photo'))
  async createPhoto (
    @UploadedFile() photo: Express.Multer.File,
    @Body() body: CreatePhotoDto,
  ) {
    return this.photoService.createPhoto(photo, body);
  }
}
