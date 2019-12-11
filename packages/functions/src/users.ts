import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { UsersHandler } from "./handlers/users";
import { container } from "./shared/inversify.config";

export const handler = (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  return container.get(UsersHandler).handle(event);
};