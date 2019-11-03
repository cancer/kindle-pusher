import { APIGatewayEvent } from "aws-lambda";
import { BooksHandler } from "./handlers/books";
import { container } from "./shared/inversify.config";

export const handler = (event: APIGatewayEvent) => {
  return container.get(BooksHandler).handle(event);
};