import { RedisClientType } from "redis";
import { GenerateKeyRedis } from "../namespaces";
import { instanceRedis } from "../redis";

export class rateLimingRedis {
  private readonly redisClient: RedisClientType;
  constructor() {
    this.redisClient = instanceRedis.getClient();
  }
  async rateControllerByUser(user: string) {
    const key = GenerateKeyRedis.rateLimitingByUser(user);
    const contador = await this.redisClient.incr(key);

    if (contador === 1) {
      this.redisClient.expire(key, 60);
    }

    if (contador > 5) {
      const ttl = await this.redisClient.ttl(key);
      console.log(ttl);
      return false;
    }
  }
}
