import { Sequelize } from 'sequelize-typescript';
import { User } from '../entities/user.entity';
import * as process from 'process';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(process.env.DATABASE_URL);
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
