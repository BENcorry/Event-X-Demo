import { Module, CacheModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TasksServices } from './tasks.service';
import { COIN_API_KEY } from '../../constants';

@Module({
  imports: [
    CacheModule.register(),
    HttpModule.register({
      url: `https://rest.coinapi.io/`,
      headers: {
        'X-CoinAPI-Key': COIN_API_KEY,
      },
    }),
  ],
  providers: [TasksServices],
})
export class TasksModule {}
