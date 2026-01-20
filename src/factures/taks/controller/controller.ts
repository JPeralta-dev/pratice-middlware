import { ServiceTaks } from "../service/service";
import { NextFunction, Request, Response } from "express";

export class ControllerTaks {
  constructor(private readonly service: ServiceTaks) {
    this.save = this.save.bind(this);
  }

  save(req: Request, res: Response, next: NextFunction): void {
    const body = req.body;

    const result = this.service.save(body);

    if (!result.success) {
      res.status(result.statuCode).json({ error: result.error });
      return;
    }

    res.status(result.statuCode).json({ message: result.value });
  }
}
