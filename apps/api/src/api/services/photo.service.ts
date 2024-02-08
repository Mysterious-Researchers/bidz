import { Inject, Injectable, UploadedFile } from '@nestjs/common';
import { FileService } from '../../config/file.service';
import { Photo } from '../../database/entities/photo.entity';

@Injectable()
export class PhotoService {
  constructor(
    @Inject('PHOTOS_REPOSITORY')
    private photoModel: typeof Photo,
    private readonly fileService: FileService,
  ) {}
  async createPhoto(@UploadedFile() photo: Express.Multer.File, index: number) {
    const link = await this.fileService.saveByHash(photo, 'photos');
    const createdPhoto = await this.photoModel.create({
      link,
      index,
    });
    return { link: createdPhoto.link, index: createdPhoto.index };
  }
}
