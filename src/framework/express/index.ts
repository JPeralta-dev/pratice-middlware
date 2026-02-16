import express, { Response, Request, json } from "express";
import morgan from "morgan";
import { routeBase } from "../../config/route/route";
import { routeAuth } from "../../factures/user/route/auth/auth";
import { routeUser } from "../../factures/user/route/user/user";
import { routeTaks } from "../../factures/taks/route/route";
import { instanceRedis } from "../../config/db/redis/redis";
import { ErrorMiddlware } from "../../middlwares/error-handler/error";

const app = express();

const PORT = 3000;

app.use(json());

app.use(morgan("dev"));

app.use(routeBase, routeAuth("/auth"));
app.use(routeBase, routeUser("/user"));
app.use(routeBase, routeTaks("/taks"));

app.get("/", (req: Request, res: Response) => {
  res.send("Server builder ... ✔");
});

app.get("/health", async (req: Request, res: Response) => {
  const status = instanceRedis.getStatus();
  const isPingOk = await instanceRedis.ping();

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
app.use(ErrorMiddlware);
/**
 * Mira cosa clave de express el ordne de registro de los middleware importa mucho y deben ir luego de que cargas las rutas
 */

async function Main() {
  try {
    await instanceRedis.connectRedis();
    const redisStatus = instanceRedis.getStatus();
    if (redisStatus) {
      console.log("✅ Redis connected successfully");
    } else {
      console.warn("⚠️ Redis not available - Rate limiting will be disabled");
      console.warn("⚠️ Application will continue without Redis");
    }
    app.listen(PORT, () => {
      console.log(
        `esta encendido el server en el puerto http://localhost:${PORT}`,
      );
    });
  } catch (error) {
    console.log("Hubo un error al inicar el server " + error);
    process.exit(1);
  }
}

Main();

process.on("SIGINT", async () => {
  console.log("\n🛑 Cerrando servidor...");
  await instanceRedis.disconnect();
  console.log("✅ Redis desconectado");
  process.exit(0);
});
// bueno tener un evento que pueda desconectar el todo antes de caer ✔

/**
 * Por el momento lo que noto es mucho ANY -> : Medio medio
 * también que no estas usando un lintter ni formateador de código : por realizar
 * falta manejo de errores centralizado : Por aprender porque no se, hacerlo correctamente
 * falta validaciones de datos de entrada : me dio flojera esto JAJSDJAJSDJASJ
 * Nombres poco descriptivos y en las carpetas/archivos algnos están con iniciales en Mayuscula y otros en minuscula:
 */
