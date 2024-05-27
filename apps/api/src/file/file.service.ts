import { createHash } from 'crypto';
import { extname, join } from 'path';
import * as fs from 'fs';
import { resolve } from 'url';
import * as process from 'process';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  async saveByHash (file: Express.Multer.File, directory: string) {
    const fileName = createHash('md5').update(file.buffer).digest('hex');
    const filePath = join(
      __dirname,
      'static',
      directory,
      fileName + extname(file.originalname),
    );

    await fs.promises.writeFile(filePath, file.buffer);

    return resolve(
      process.env.BASE_URL,
      join(directory, fileName + extname(file.originalname)),
    );
  }
}
