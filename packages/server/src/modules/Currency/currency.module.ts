import { Module, CacheModule } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';

@Module({
  imports: [CacheModule.register()],
  controllers: [CurrencyController],
  providers: [CurrencyService],
})
export class CurrencyModule {}
