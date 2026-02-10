export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
  ) {
    super(message);
    this.name = this.constructor.name; //-> “Cuando este error aparezca en logs, stack traces o respuestas, quiero que se llame como mi clase de error.”
    Error.captureStackTrace(this, this.constructor); // -> “Cuando este error se lance, muéstrame el stack trace empezando desde donde realmente ocurrió el problema, no desde la clase base.”
  }
}
