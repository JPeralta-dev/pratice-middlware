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
    limit: number = 5,
    windowsSecond: number = 30,
  ): Promise<RedisHeadersInterface> {
    // Espera a que el cliente esté conectado
    if (!this.redisClient) {
      this.redisClient = await instanceRedis.getClient();
    }

    const luaScript = `
    local current = redis.call('INCR', KEYS[1])
    if current == 1 then
    redis.call('EXPIRE', KEYS[1],ARGV[1])
    end
    return current
    `;
    const key = GenerateKeyRedis.rateLimitingByUser(user); // genera la clave

    const contador = (await this.redisClient.eval(luaScript, {
      keys: [key],
      arguments: [windowsSecond.toString()],
    })) as number;

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

  async rateControllerByIp(
    ip: string,
    limit: number = 5,
    windowsSecond: number = 20,
  ): Promise<RedisHeadersInterface> {
    if (!this.redisClient) {
      this.redisClient = await instanceRedis.getClient();
    }
    const luaScript = `
    local current = redis.call('INCR', KEYS[1])
    if current == 1 then
    redis.call('EXPIRE', KEYS[1],ARGV[1])
    end
    return current`;

    const key = GenerateKeyRedis.rateLimitingByIp(ip);

    const contador = (await this.redisClient.eval(luaScript, {
      keys: [key],
      arguments: [windowsSecond.toString()],
    })) as number;
    console.log(contador);

    const ttl = await this.redisClient.ttl(key);
    const resetAt = Math.floor(Date.now() / 1000) + ttl;

    console.log(ttl);

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
}

export const instanceRateLimiting = new rateLimingRedis();
