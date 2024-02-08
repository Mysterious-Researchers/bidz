import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Param,
} from '@nestjs/common';
import { PhotoService } from '../services/photo.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('photos')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post(':index')
  @UseInterceptors(FileInterceptor('photos'))
  async createPhoto(
    @UploadedFile() photo: Express.Multer.File,
    @Param('index') index: number,
  ) {
    return this.photoService.createPhoto(photo, index);
  }
}
