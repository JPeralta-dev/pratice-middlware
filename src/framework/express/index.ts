import express, { Response, Request, json } from "express";
import morgan from "morgan";
import { routeBase } from "../../config/route/route";
import { routeAuth } from "../../factures/user/route/auth/auth";
import { routeUser } from "../../factures/user/route/user/user";
import { JwtMiddlware } from "../../middlwares/jwt/jwt";
import { routeTaks } from "../../factures/taks/route/route";
import { RedisClient } from "../../config/db/redis/redis";

const app = express();

const PORT = 3000;

export const jwtObject: JwtMiddlware = JwtMiddlware.getIntance();

app.use(json());

app.use(morgan("dev"));

app.use(routeBase, routeAuth("/auth"));
app.use(routeBase, routeUser("/user"));
app.use(routeBase, routeTaks("/taks"));

app.get("/", (req: Request, res: Response) => {
  res.send("Server builder ... ✔");
});

app.get("/health", async (req: Request, res: Response) => {
  const status = RedisClient.getIntance().getStatus();
  const isPingOk = await RedisClient.getIntance().ping();

  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    redis: {
      connected: status,
      ready: status,
      ping: isPingOk,
    },
  });
});

async function serveUp() {
  try {
    await RedisClient.getIntance().connectRedis();
    app.listen(PORT, () => {
      console.log(
        `esta encendido el server en el puerto http://localhost:${PORT}`,
      );
    });
  } catch (error) {
    console.log("Hubo un error al inicar el server " + error);
  }
}

serveUp();

process.on("SIGINT", async () => {
  console.log("\n🛑 Cerrando servidor...");
  await RedisClient.getIntance().disconnect();
  console.log("✅ Redis desconectado");
  process.exit(0);
});
// bueno tener un evento que pueda desconectar el todo antes de caer
