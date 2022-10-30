import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CustomerCacheModule } from '../Cache/cache.module';
import { TasksServices } from './tasks.service';

@Module({
  imports: [CustomerCacheModule, HttpModule.register({})],
  providers: [TasksServices],
})
export class TasksModule {}
