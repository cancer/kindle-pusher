import { APIGatewayEvent } from "aws-lambda";
import { handleUsersGet } from "./handlers/users/get";
import { handleUsersPost } from "./handlers/users/post";
import { makeErrorResponse } from "./shared/make-error-response";

export const handler = (event: APIGatewayEvent) => {
  if (event.httpMethod === 'POST') {
    return handleUsersPost(event);
  }
  
  if (event.httpMethod === 'GET') {
    return handleUsersGet(event);
  }
  
  return makeErrorResponse(405, new Error(`${event.httpMethod} is not allowed.`));
};