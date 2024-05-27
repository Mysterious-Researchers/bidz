import { Inject, Injectable } from '@nestjs/common';
import { FileService } from '../../file/file.service';
import { Photo } from '../../database/entities/photo.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';

@Injectable()
export class PhotoService {
  constructor (
    @Inject('PHOTOS_REPOSITORY')
    private photoModel: typeof Photo,
    private readonly fileService: FileService,
  ) {}
  async createPhoto (
    photo: Express.Multer.File,
    { auctionId, index }: CreatePhotoDto,
  ) {
    const link = await this.fileService.saveByHash(photo, 'photos');
    const createdPhoto = await this.photoModel.create({
      auctionId,
      link,
      index,
    });
    return {
      auctionId: createdPhoto.auctionId,
      link: createdPhoto.link,
      index: createdPhoto.index,
    };
  }
}
