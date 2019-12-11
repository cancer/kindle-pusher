import { AuthorizationError } from "../../domains/error/authorization";
import { HttpMethodNotAllowedError } from "../../domains/error/method-not-allowed";

export const getStatusCodeByError = (e: Error): number => {
  switch (true) {
    case e instanceof AuthorizationError:
      return 401;
    case e instanceof HttpMethodNotAllowedError:
      return 405;
    default:
      return 500;
  }
}