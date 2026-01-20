import { route } from "../../../config/route/route";

export const routeTaks = (prefix: string) => {
  route.get("/", () => {});

  route.post("/", () => {});

  route.delete("/", () => {});

  route.get("/:id", () => {});

  return route;
};
