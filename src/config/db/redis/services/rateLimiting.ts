import { RedisClientType } from "redis";
import { GenerateKeyRedis } from "../namespaces";
import { instanceRedis } from "../redis";

export class rateLimingRedis {
  private redisClient: RedisClientType | null = null;

  async rateControllerByUser(user: string) {
    // Espera a que el cliente esté conectado
    if (!this.redisClient) {
      this.redisClient = await instanceRedis.getClient();
    }

    const key = GenerateKeyRedis.rateLimitingByUser(user);
    const contador = await this.redisClient.incr(key);

    if (contador === 1) {
      await this.redisClient.expire(key, 30);
    }

    if (contador > 5) {
      const ttl = await this.redisClient.ttl(key);
      console.log(ttl);
      return false;
    }
    return true;
  }
}

export const instanceRateLimiting = new rateLimingRedis();
