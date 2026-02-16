import { createClient, RedisClientType } from "redis";
import { config } from "dotenv";
import { env } from "../../env/env";
import { ConnectionError } from "../../../exeptions/externalError";

config();

export class RedisClient {
  private static redis: RedisClient;
  private readonly client: RedisClientType;
  private readonly password: string;
  private readonly url: string;
  private statusRedis: boolean;
  private connectPromise: Promise<void> | null = null;

  private constructor() {
    this.statusRedis = false;
    this.password = env.PASSWORD_REDIS;
    this.url = env.URL_REDIS || "redis://localhost:6379";

    this.client = createClient({
      url: this.url,
      password: this.password,
      socket: {
        // Los socket es uyna propiedad que nos ayuda a saber como node va a conectarse y tener mejor control
        reconnectStrategy: (retries) => {
          if (retries > 10) {
            // si no controlamos esta propiedad con redis no nos deja avanzar
            console.error("❌ Redis: Max reconnection attempts reached");
            return false; // Detiene los intentos de reconexión
          }
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

    this.client.on("reconnecting", () => {
      console.log("Redis intentando reconectar...");
    });

    this.client.on("error", (error) => {
      // if (error instanceof AggregateError) {
      //   error.errors.forEach((err) => {
      //     console.error("Redis error:", err.code);
      //     this.statusRedis = false;
      //   });
      // }
    });
  }

  async connectRedis() {
    if (!this.connectPromise) {
      this.connectPromise = this.client
        .connect()
        .then(() => {
          this.statusRedis = true;
        })
        .catch((error) => {
          this.statusRedis = false;
          this.connectPromise = null;
          console.log(new ConnectionError("REDIS", error.code ?? "UNKNOWN"));
        });
    }
    return this.connectPromise;
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
    try {
      if (this.client.isOpen && this.statusRedis) {
        return this.client;
      }
      if (this.connectPromise) {
        await this.connectPromise;

        return this.client.isOpen ? this.client : null;
      }
      await this.connectRedis();

      return this.client.isOpen ? this.client : null;
    } catch (error) {
      return null;
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (this.statusRedis && this.client.isOpen) {
        await this.client.quit();
        this.statusRedis = false;
        this.connectPromise = null;
      }
    } catch (error) {
      console.error("❌ Error disconnecting Redis:", error);
      // Intenta forzar el cierre
      try {
        this.client.destroy();
      } catch (e) {
        console.error("❌ Error forcing Redis disconnect:", e);
      }
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
