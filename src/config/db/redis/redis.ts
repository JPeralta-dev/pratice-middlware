import { createClient, RedisClientType } from "redis";
import { config } from "dotenv";

config();

export class redisClient {
  private static redis: redisClient;
  private readonly client: RedisClientType;
  private readonly password: string;
  private readonly url: string;
  private statusRedis: boolean;

  private constructor() {
    this.statusRedis = false;
    this.password = process.env.PASSWORD_REDIS?.toString() || "";
    this.url = process.env.URL_REDIS?.toString() || "";

    this.client = createClient({
      url: this.url,
      password: this.password,
    });

    this.client.on("connect", () => {
      console.log("Redis Conectando");
    });

    this.client.on("ready", () => {
      console.log("Redis listo ✔");
    });

    this.client.on("error", (error) => {
      console.log("hubo un error y es" + error);
    });
  }

  async connectRedis(): Promise<void> {
    try {
      this.client.connect();
      this.statusRedis = true;
    } catch (error) {
      console.log("error" + error);
    }
  }

  getStatus(): boolean {
    return this.statusRedis;
  }

  async ping(): Promise<boolean> {
    try {
      const result = await this.client.ping();
      return result === "PONG";
    } catch (error) {
      return false;
    }
  }

  public static getIntance(): redisClient {
    if (!this.redis) {
      this.redis = new redisClient();
      return this.redis;
    }
    return this.redis;
  }
}
