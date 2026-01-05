import express, { Response, Request, json } from "express";
import morgan from "morgan";
import { routeBase } from "../../config/route/route";
import { routeAuth } from "../../factures/user/route/auth/auth";
import { routeUser } from "../../factures/user/route/user/user";
import { MiddlwareJwt } from "../../middlwares/jwt/jwt";

const app = express();

const PORT = 3000;

export const jwtObject: MiddlwareJwt = MiddlwareJwt.getIntance();

app.use(json());

app.use(morgan("dev"));

app.use(routeBase, routeAuth("/auth"));
app.use(routeBase, routeUser("/user"));

app.get("/", (req: Request, res: Response) => {
  res.send("Server builder ... ✔");
});

app.listen(PORT, () => {
  console.log(`esta encendido el server en el puerto http://localhost:${PORT}`);
});
