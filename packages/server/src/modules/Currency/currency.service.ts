import { Injectable } from '@nestjs/common';
import { LAST_CURRENCY_LIST, LAST_USER_VISIT } from '../../constants';
import { CustomerCacheService } from '../Cache/cache.service';

@Injectable()
export class CurrencyService {
  constructor(private customerCacheService: CustomerCacheService) {}

  async getCurrencyList() {
    await this.customerCacheService.set(LAST_USER_VISIT, Date.now());
    const res = await this.customerCacheService.get(LAST_CURRENCY_LIST);
    return res ? JSON.parse(res) : [];
  }
}
