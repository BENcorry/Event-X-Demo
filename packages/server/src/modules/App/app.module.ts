import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { TasksModule } from '../Tasks/tasks.module';
import { CurrencyModule } from '../Currency/currency.module';
import { ResponseInterceptor } from '../../commons/interceptor/ResponseInterceprot';
import { CustomerCacheModule } from '../Cache/cache.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    CustomerCacheModule,
    TasksModule,
    CurrencyModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
