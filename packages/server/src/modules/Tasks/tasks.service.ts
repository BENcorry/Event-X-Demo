import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import {
  LAST_CURRENCY_LIST,
  LAST_USER_VISIT,
  REFRESH_INTERVER,
  LAST_RESENCENT_TIME,
} from '../../constants';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { CustomerCacheService } from '../Cache/cache.service';

@Injectable()
export class TasksServices {
  constructor(
    private customerCacheService: CustomerCacheService,
    private httpService: HttpService,
  ) {}

  // onApplicationBootstrap() {
  //   this.customerCacheService.set(LAST_USER_VISIT, Date.now());
  // }

  @Interval(REFRESH_INTERVER)
  async getCurrencyData() {
    let lastVisitTime = (await this.customerCacheService.get(
      LAST_USER_VISIT,
    )) as number;
    if (!lastVisitTime) {
      lastVisitTime = Date.now();
      this.customerCacheService.set(LAST_USER_VISIT, lastVisitTime);
    }
    const currentCurrencyList = await this.customerCacheService.get(
      LAST_CURRENCY_LIST,
    );
    console.log('===== 当前定时任务执行时间 ======', new Date());
    if (
      Date.now() - lastVisitTime < LAST_RESENCENT_TIME ||
      !currentCurrencyList
    ) {
      console.log('===== 最新获取数据时间 ======:', new Date());
      try {
        const currencyList = await lastValueFrom(
          this.httpService.get(
            'https://rest.coinapi.io/v1/assets?apikey=0C6D32DB-A349-463C-9F6C-9FB8878EB623',
          ),
        );
        await this.customerCacheService.set(
          LAST_CURRENCY_LIST,
          JSON.stringify(currencyList.data),
        );
      } catch (e) {
        throw new Error(e);
      }
    }
  }
}
