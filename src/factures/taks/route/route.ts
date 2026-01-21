import { route } from "../../../config/route/route";
import { jwtObject } from "../../../framework/express";
import { ControllerTaks } from "../controller/controller";
import { repositoryTaks } from "../repository/taks";
import { ServiceTaks } from "../service/service";

export const routeTaks = (prefix: string) => {
  const service = new ServiceTaks();
  const controller = new ControllerTaks(service);

  route.get("/", () => {});

  route.post(`${prefix}/`, controller.save);

  route.delete("/", () => {});

  route.get(`${prefix}/:id`, jwtObject.verifyToken, controller.findByCreated);

  return route;
};
