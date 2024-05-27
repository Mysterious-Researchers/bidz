import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { photoProviders } from '../../database/providers/photo.provider';
import { FileService } from '../../file/file.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PhotoController],
  providers: [PhotoService, ...photoProviders, FileService],
})
export class PhotoModule {}
