import { Module } from '@nestjs/common';
import { CustomerCacheService } from './cache.service';

@Module({
  providers: [CustomerCacheService],
  exports: [CustomerCacheService],
})
export class CustomerCacheModule {}
