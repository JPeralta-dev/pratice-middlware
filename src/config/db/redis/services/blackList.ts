import { RedisClientType } from "redis";
import { instanceRedis } from "../redis";
import { GenerateKeyRedis } from "../namespaces";
import { AppError } from "../../../../exeptions/appError";

export class BlackListService {
  private client: RedisClientType | null = null;

  constructor() {
    this.initializeRedisClient();
  }

  private async initializeRedisClient() {
    try {
      this.client = await instanceRedis.getClient();
    } catch (error) {
      console.warn(
        "⚠️ Redis client not available for rate limiting - Rate limiting disabled",
      );
      this.client = null;
    }
  }

  async addToBlackList(
    jti: string,
    expireIn: number,
  ): Promise<void | boolean | AppError> {
    try {
      if (!this.client) {
        return false;
      }
      const key = GenerateKeyRedis.generateKeyBlacklist();
      const status = await this.client.set(key, jti, {
        condition: "NX",
        expiration: {
          type: "EX",
          value: expireIn,
        },
      });
      console.log(status);
      const ttl = await this.client.ttl(key + jti);
      console.log(ttl);
    } catch (error) {}
  }
}
