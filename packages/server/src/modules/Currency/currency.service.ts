import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { LAST_CURRENCY_LIST, LAST_USER_VISIT } from '../../constants';

@Injectable()
export class CurrencyService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getCurrencyList() {
    await this.cacheManager.set(LAST_USER_VISIT, Date.now());
    const res = await this.cacheManager.get(LAST_CURRENCY_LIST);
    if (res) {
      return res;
    }
    const mock = new Array(20).fill({
      name: 'Bitcoin',
      volume_1hrs_usd: 11111.23213213,
      price_usd: 4121111.333333,
    });
    return mock;
  }
}
