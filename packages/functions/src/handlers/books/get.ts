import { APIGatewayEvent } from "aws-lambda";
import { promises } from 'fs';
import { resolve } from 'path';

export const handleBooksGet = async (event: APIGatewayEvent) => {
  return {
    statusCode: 200,
    body: await promises.readFile(resolve('./packages/functions/static/all.json'), 'utf-8'),
  };
}