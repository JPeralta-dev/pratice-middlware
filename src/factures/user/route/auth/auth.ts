import { Router } from "express";
import { route } from "../../../../config/route/route";
import { ServiceAuthLogin } from "../../service/auth/login";
import { AuthController } from "../../controller/auth/auth";

export const routeAuth = (prefix: string): Router => {
  const service = new ServiceAuthLogin();
  const controllerAuthLogin = new AuthController(service);

  route.post(`${prefix}/login`, controllerAuthLogin.login);

  route.post(`${prefix}/register`, () => ({}));

  return route;
};
