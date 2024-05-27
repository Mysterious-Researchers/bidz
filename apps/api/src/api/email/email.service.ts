import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { resolve } from 'path';

@Injectable()
export class EmailService {
  constructor (private mailerService: MailerService) {}

  async sendEmail (data) {
    await this.mailerService.sendMail({
      to: data.to,
      subject: 'Welcome',
      template: resolve('./mail/templates/template.hbs'),
      context: {
        name: data.name,
        url: data.link,
      },
    });
  }
}
