import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { AddBooksHandler } from "./handlers/add-books";
import { container } from "./shared/inversify.config";

export const handler = (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  return container.get(AddBooksHandler).handle(event);
};