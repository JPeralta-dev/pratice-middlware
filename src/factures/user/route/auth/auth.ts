import { Router } from "express";
import { route } from "../../../../config/route/route";
import { ServiceAuthLogin } from "../../service/auth/login";
import { AuthController } from "../../controller/auth/auth";
import { ServiceAuthRegister } from "../../service/auth/register";

export const routeAuth = (prefix: string): Router => {
  const service = new ServiceAuthLogin();
  const serviceRegister = new ServiceAuthRegister();
  const controllerAuthLogin = new AuthController(service, serviceRegister);

  route.post(`${prefix}/login`, controllerAuthLogin.login);

  route.post(`${prefix}/register`, controllerAuthLogin.register);

  return route;
};
