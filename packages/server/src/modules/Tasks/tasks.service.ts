import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { Cache } from 'cache-manager';
import {
  LAST_CURRENCY_LIST,
  LAST_USER_VISIT,
  REFRESH_INTERVER,
  LAST_RESENCENT_TIME,
} from '../../constants';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class TasksServices {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private httpService: HttpService,
  ) {}

  @Interval(REFRESH_INTERVER)
  async getCurrencyData() {
    const lastVisitTime: number = await this.cacheManager.get(LAST_USER_VISIT);
    const currentCurrencyList = await this.cacheManager.get(LAST_CURRENCY_LIST);
    if (
      Date.now() - lastVisitTime > LAST_RESENCENT_TIME ||
      !currentCurrencyList
    ) {
      try {
        const currencyList = await lastValueFrom(
          this.httpService.get('/v1/assets'),
        );
        await this.cacheManager.set(LAST_CURRENCY_LIST, currencyList);
      } catch (e) {
        throw new Error(e);
      }
    }
  }
}
