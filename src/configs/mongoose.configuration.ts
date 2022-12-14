import { MongooseModule } from '@nestjs/mongoose';
import { getEnvVar } from 'src/helpers/getEnvVar.helper';

export const configureMongooseModule = () => {
  return MongooseModule.forRootAsync({
    useFactory: () => ({
      uri: `mongodb://${getEnvVar('mongo_host')}:27017,
      )}/discord`,
      authSource: 'discord',
      user: getEnvVar('mongo_user'),
      pass: getEnvVar('mongo_pass'),
    }),
  });
};
