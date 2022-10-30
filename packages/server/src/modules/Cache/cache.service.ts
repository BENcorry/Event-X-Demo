import { Injectable } from '@nestjs/common';
import { RedisInstance } from '../../commons/utils/redis';

@Injectable()
export class CustomerCacheService {
  private _instance = null;

  async onModuleInit() {
    this._instance = await RedisInstance.initRedis();
  }

  async get(key: string) {
    const res = await this._instance.get(key);
    return res;
  }

  async set(key: string, val: any) {
    return this._instance.set(key, val);
  }
}
