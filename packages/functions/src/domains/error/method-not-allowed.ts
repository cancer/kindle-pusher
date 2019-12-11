import { AppError } from "./app-error";

export class HttpMethodNotAllowedError extends AppError {
  constructor(httpMethod: string) {
    super(`${httpMethod} is not allowed.`);
  }
}