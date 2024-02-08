import { Photo } from '../entities/photo.entity';

export const photoProviders = [
  {
    provide: 'PHOTOS_REPOSITORY',
    useValue: Photo,
  },
];
