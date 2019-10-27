import { APIGatewayEvent } from "aws-lambda";
import { handleUsersPost } from "./handlers/users/post";
import { makeErrorResponse } from "./shared/make-error-response";

export const handler = (event: APIGatewayEvent) => {
  if (event.httpMethod === 'POST') {
    return handleUsersPost(event);
  }
  
  return makeErrorResponse(405, new Error(`${event.httpMethod} is not allowed.`));
};