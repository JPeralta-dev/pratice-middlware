import { route } from "../../../config/route/route";

import { instanceJwtMiddlware } from "../../../middlwares/jwt/jwt";
import { ControllerTaks } from "../controller/controller";
import { repositoryTaks } from "../repository/taks";
import { ServiceTaks } from "../service/service";

export const routeTaks = (prefix: string) => {
  const service = new ServiceTaks();
  const controller = new ControllerTaks(service);

  route.get("/", () => {});

  route.post(`${prefix}/`, instanceJwtMiddlware.verifyToken, controller.save);

  route.delete("/", () => {});

  route.get(
    `${prefix}/:id`,
    instanceJwtMiddlware.verifyToken,
    controller.findByCreated,
  );

  return route;
};
