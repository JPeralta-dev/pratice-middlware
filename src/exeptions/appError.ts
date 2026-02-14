import { ServiceSource } from "../types/typesServices";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public service?: ServiceSource,
  ) {
    super(message);
    // Si js me pone problema recuerda lo de prototype y de cambiarlo
    this.name = this.constructor.name; //-> “Cuando este error aparezca en logs, stack traces o respuestas, quiero que se llame como mi clase de error.”
    Error.captureStackTrace(this, this.constructor); // -> “Cuando este error se lance, muéstrame el stack trace empezando desde donde realmente ocurrió el problema, no desde la clase base.”
  }
}
