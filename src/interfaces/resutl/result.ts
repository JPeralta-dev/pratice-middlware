export interface IFailureProcess<T> {
  success: false;
  error: T;
  statusCode: number;
}

export interface ISuccessProcess<T> {
  success: true;
  value: T;
  statusCode: number;
}
