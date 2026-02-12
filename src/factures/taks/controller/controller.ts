import { ServiceTaks } from "../service/service";
import { NextFunction, Request, Response } from "express";

export class ControllerTaks {
  constructor(private readonly service: ServiceTaks) {
    this.save = this.save.bind(this);
    this.findByCreated = this.findByCreated.bind(this);
  }

  async save(req: Request, res: Response, next: NextFunction): Promise<void> {
    const requestData = req.body;

    const operationResult = await this.service.save(requestData);

    if (!operationResult.success) {
      return next(operationResult.error);
    }

    res
      .status(operationResult.statusCode)
      .json({ message: operationResult.value });
  }
  async findByCreated(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const requestData = req.params.id;

    const operationResult = await this.service.findByCreated(requestData);

    if (!operationResult.success) {
      return next(operationResult.error);
    }

    res
      .status(operationResult.statusCode)
      .json({ message: operationResult.value });
  }
}
