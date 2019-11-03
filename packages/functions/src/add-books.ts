import { APIGatewayEvent } from "aws-lambda";
import { handleAddBooksPost } from "./handlers/add-books";
import { makeErrorResponse } from "./lib/response/make-error-response";

export const handler = (event: APIGatewayEvent) => {
  if (event.httpMethod === 'POST') {
    return handleAddBooksPost();
  }
  
  return makeErrorResponse(405, new Error(`${event.httpMethod} is not allowed.`));
};