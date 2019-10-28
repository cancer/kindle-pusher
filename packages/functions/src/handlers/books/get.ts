import { APIGatewayEvent } from "aws-lambda";
import { promises } from 'fs';
import { resolve } from 'path';

export const handleBooksGet = async (event: APIGatewayEvent) => {
  const books = JSON.parse(await promises.readFile(resolve('./packages/functions/static/all.json'), 'utf-8'));
  return {
    statusCode: 200,
    body: JSON.stringify((books as any).itemsList.map((v: any, i: number) => {
      return {
        ...v,
        ignored: i%2 === 0,
      };
    })),
  };
}