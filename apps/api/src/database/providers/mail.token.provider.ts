import { MailTokenEntity } from '../entities/mail.token.entity';

export const mailTokenProvider = [
  {
    provide: 'MAIL_TOKEN_REPOSITORY',
    useValue: MailTokenEntity,
  },
];
