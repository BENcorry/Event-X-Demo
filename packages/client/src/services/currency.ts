import { request } from 'umi';

export interface CurrencyListItem {
  asset_id?: string; // Our asset identifier. Superset of the ISO 4217 currency codes standard.
  name: string; // Display name of the asset.
  type_is_crypto?: boolean; // Boolean value transported as integer; 1 for cryptocurrency assets, 0 otherwise.
  data_quote_start?: number; // The date and time of first quote.
  data_quote_end?: number; // The date and time for last quote.
  data_orderbook_start?: number; // The date and time for first order book.
  data_orderbook_end?: number; // The date and time for last order book.
  data_trade_start?: number; // The date and time for first trade.
  data_trade_end?: number; // The date and time for last trade.
  data_quote_count?: number; // The count of quotes.
  data_trade_count?: number; // The count of trades.
  data_symbols_count?: number; // The count of symbols for given asset.
  volume_1hrs_usd: number; // The usd volume of all symbols associated with this asset from last 1 hour rolling period.
  volume_1day_usd?: number; // The usd volume of all symbols associated with this asset from last 1 day rolling period.
  volume_1mth_usd?: number; // The usd volume of all symbols associated with this asset from last 1 month rolling period.
  price_usd: number; // The actual usd price.
}

export type ResonseCurrencyList = CurrencyListItem[];

export async function getCurrencyList(): Promise<ResonseCurrencyList> {
  const res = await request('/apis/currency/list');
  return res;
}
