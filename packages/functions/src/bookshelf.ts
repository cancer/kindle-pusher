import { APIGatewayEvent } from "aws-lambda";
import { handleBookshelfGet } from "./handlers/bookshelf/get";
import { makeErrorResponse } from "./shared/make-error-response";

export const handler = (event: APIGatewayEvent) => {
  if (event.httpMethod === 'GET') {
    return handleBookshelfGet(event);
  }
  
  return makeErrorResponse(405, new Error(`${event.httpMethod} is not allowed.`));
};