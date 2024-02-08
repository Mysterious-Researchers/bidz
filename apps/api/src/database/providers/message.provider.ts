import { Message } from '../entities/message.entity';

export const messageProviders = [
  {
    provide: 'MESSAGES_REPOSITORY',
    useValue: Message,
  },
];