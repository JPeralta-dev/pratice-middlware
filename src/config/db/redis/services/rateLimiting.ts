import { RedisClientType } from "redis";
import { GenerateKeyRedis } from "../namespaces";
import { instanceRedis } from "../redis";
import { RedisHeadersInterface } from "../interfaces/redis";

export class rateLimingRedis {
  private redisClient: RedisClientType | null = null;

  constructor() {
    this.rateControllerByUser = this.rateControllerByUser.bind(this);
  }

  async rateControllerByUser(
    user: string,
    limit = 5,
    windowsSecond = 30,
  ): Promise<RedisHeadersInterface> {
    // Espera a que el cliente esté conectado
    if (!this.redisClient) {
      this.redisClient = await instanceRedis.getClient();
    }

    const key = GenerateKeyRedis.rateLimitingByUser(user);
    const contador = await this.redisClient.incr(key);

    if (contador === 1) {
      await this.redisClient.expire(key, windowsSecond);
    }
    const ttl = await this.redisClient.ttl(key);
    const resetAt = Math.floor(Date.now() / 1000) + ttl;
    if (contador > limit) {
      return {
        allowed: false,
        limit,
        remaining: 0,
        resetAt,
        retryAfter: ttl,
      };
    }
    return {
      allowed: true,
      limit,
      remaining: limit - contador,
      resetAt,
    };
  }

  async rateControllerByIp(ip: string, limit = 3, windowsSecond: 60) {
    if (!this.redisClient) {
      this.redisClient = await instanceRedis.getClient();
    }

    const key = GenerateKeyRedis.rateLimitingByIp(ip);
    const contador = await this.redisClient.incr(key);

    const ttl = await this.redisClient.ttl(key);
    const resetAt = Math.floor(Date.now() / 1000) + ttl;

    if (contador === 1) await this.redisClient.expire(key, windowsSecond);
    if (limit > contador) {
      return {
        allowed: false,
        limit,
        remaining: 0,
        resetAt,
        retryAfter: ttl,
      };
    }

    return {
      allowed: true,
      limit,
      remaining: limit - contador,
      resetAt,
    };
  }
}

export const instanceRateLimiting = new rateLimingRedis();
