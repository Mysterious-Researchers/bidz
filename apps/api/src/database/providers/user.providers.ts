import { User } from '../entities/user.entity';

export const userProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: User,
  },
];
