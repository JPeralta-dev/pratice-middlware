import { Router } from "express";
import { route } from "../../../../config/route/route";
import { ServiceAuthLogin } from "../../service/auth/login";
import { AuthController } from "../../controller/auth/auth";
import { ServiceAuthRegister } from "../../service/auth/register";

import { serviceRefreshToken } from "../../service/auth/refresh";
import { RateMiddlware } from "../../../../middlwares/rate-limiting/rate-limiting";
import { validateDto } from "../../../../middlwares/validate/validate";
import { LoginDto, RegisterDto } from "../../../../dtos/user/user.input";

export const routeAuth = (prefix: string): Router => {
  const service = new ServiceAuthLogin();
  const serviceRegister = new ServiceAuthRegister();
  const serviceRefresh = new serviceRefreshToken();
  const controllerAuthLogin = new AuthController(
    service,
    serviceRegister,
    serviceRefresh,
  );

  route.post(
    `${prefix}/login`,
    validateDto(LoginDto),
    RateMiddlware.rateLimitingByIp,
    controllerAuthLogin.login,
  );

  route.post(
    `${prefix}/register`,
    validateDto(RegisterDto),
    RateMiddlware.rateLimitingByIp,
    controllerAuthLogin.register,
  );

  route.post(
    `${prefix}/refresh`,
    RateMiddlware.rateLimitingByIp,
    controllerAuthLogin.refreshToken,
  );

  return route;
};
