import { createClient, RedisClientType } from "redis";
import { config } from "dotenv";

config();

export class RedisClient {
  private static redis: RedisClient;
  private readonly client: RedisClientType;
  private readonly password: string;
  private readonly url: string;
  private statusRedis: boolean;

  private constructor() {
    this.statusRedis = false;
    this.password = process.env.PASSWORD_REDIS?.toString() || "";
    this.url = process.env.URL_REDIS?.toString() || "redis://localhost:6379";

    if (!this.url) {
      throw new Error("Not found url redis in file .env");
    }
    this.client = createClient({
      url: this.url,
      password: this.password,
      socket: {
        // Los socket es uyna propiedad que nos ayuda a saber como node va a conectarse y tener mejor control
        reconnectStrategy: (retries) => {
          // Bella esta propiedad, nos dice como y cuando node se reconecta a redis
          return Math.min(retries * 100, 3000); // funcion que dewvuelve el numero mas pequeño que 3000 pero que no se sobre pase
        },
        connectTimeout: 5000, // Propiedad que toma el tiempo de espera para conectarse
        keepAlive: true,
      },
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

    this.client.on("SIGINT", async () => {
      console.log("Cerrando servidor...");
      await RedisClient.getIntance().disconnect();
    });
  }

  async connectRedis(): Promise<void> {
    try {
      await this.client.connect();
      this.statusRedis = true;
    } catch (error) {
      console.log("error" + error); // TODOS:MANEJO DE ERROES CORRECTO
      throw error;
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

  async getClient() {
    await this.connectRedis();
    if (!this.statusRedis) {
      throw new Error("Redis no ha iniciado");
    }
    return this.client;
  }

  async disconnect(): Promise<void> {
    try {
      if (this.statusRedis) {
        await this.client.close();
        this.statusRedis = false;
      }
    } catch (error) {
      throw error;
    }
  }

  public static getIntance(): RedisClient {
    if (!this.redis) {
      this.redis = new RedisClient();
      return this.redis;
    }
    return this.redis;
  }
}

export const instanceRedis = RedisClient.getIntance();
