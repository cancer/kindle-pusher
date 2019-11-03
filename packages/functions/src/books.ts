import { APIGatewayEvent } from "aws-lambda";
import { handleBooksGet } from "./handlers/books/get";
import { makeErrorResponse } from "./lib/response/make-error-response";

export const handler = (event: APIGatewayEvent) => {
  if (event.httpMethod === 'GET') {
    return handleBooksGet(event);
  }
  
  return makeErrorResponse(405, new Error(`${event.httpMethod} is not allowed.`));
};