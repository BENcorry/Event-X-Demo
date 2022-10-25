import { Controller, Get } from '@nestjs/common';
import { CurrencyService } from './currency.service';

@Controller('/apis/currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('list')
  async getHello() {
    console.log('222222');
    const res = await this.currencyService.getCurrencyList();
    return res;
  }
}
